import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import fetch from 'isomorphic-unfetch';
import { onError } from 'apollo-link-error';
import Router from 'next/router';

import { isBrowser } from '../utils/isBrowser';
import { typeDefs } from '../client-type-defs';
import { resolvers } from '../resolvers';

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

interface Options {
  getToken: () => string;
  fetchOptions?: any;
}

// Polyfill fetch() on the server (used by apollo-client)
if (!isBrowser) {
  (global as any).fetch = fetch;
}

const create = (initialState: any, { getToken, fetchOptions }: Options) => {
  const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql',
    credentials: 'include',
    fetchOptions,
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message }) => {
        const notAuth = Object.entries(message).some(
          ([key, val]: any) => key === 'statusCode' && val === 403,
        );

        if (isBrowser && notAuth) {
          Router.replace('/login');
        }
      });
    }

    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  });

  const authLink = setContext((_, { headers }) => {
    const token = getToken();
    return {
      headers: {
        ...headers,
        cookie: token ? `qid=${token}` : '',
      },
    };
  });

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient

  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
    link: errorLink.concat(authLink.concat(httpLink)),
    cache: new InMemoryCache().restore(initialState || {}),
    typeDefs,
    resolvers,
  });
};

export const initApollo = (initialState: any, options: Options) => {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!isBrowser) {
    let fetchOptions = {};

    // If you are using a https_proxy, add fetchOptions with 'https-proxy-agent' agent instance
    // 'https-proxy-agent' is required here because it's a sever-side only module
    if (process.env.https_proxy) {
      fetchOptions = {
        //  agent: new HttpsProxyAgent(process.env.https_proxy)
      };
    }
    return create(initialState, {
      ...options,
      fetchOptions,
    });
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, options);
  }

  return apolloClient;
};
