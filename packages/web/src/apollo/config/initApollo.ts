import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';
import fetch from 'isomorphic-unfetch';
import { onError } from 'apollo-link-error';
import { setContext } from 'apollo-link-context';
import Router from 'next/router';

import { typeDefs } from '../client-type-defs';
import { resolvers } from '../resolvers';
import { isBrowser } from '../utils/isBrowser';

interface Options {
  getToken: () => string;
  fetchOptions?: any;
}

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param  {Object} initialState
 */
export const initApollo = (initialState: any, options: Options) => {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return createApollo(initialState, options);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = createApollo(initialState, options);
  }

  return apolloClient;
};

/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 */
const createApollo = (initialState: any = {}, { getToken }: Options) => {
  const httpLink = createUploadLink({
    uri: 'http://localhost:4000/graphql',
    credentials: 'include',
    fetch,
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      console.log(graphQLErrors[0]);
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

  return new ApolloClient({
    ssrMode: !isBrowser,
    link: errorLink.concat(authLink.concat(httpLink)),
    cache: new InMemoryCache().restore(initialState),
    typeDefs,
    resolvers,
  });
};
