import { ApolloCache } from 'apollo-cache';
import ApolloClient from 'apollo-client';

type GetCacheKey = (obj: { __typename: string; id: string | number }) => any;

interface ApolloContext {
  cache: ApolloCache<{}>;
  getCacheKey: GetCacheKey;
  client: ApolloClient<{}>;
}

interface Args {
  type: string;
}

export const uiResolvers = {
  Mutation: {
    viewportType: (_root: any, { type }: Args, { cache }: ApolloContext) => {
      cache.writeData({ data: { viewportType: type } });
      return true;
    },
  },
};
