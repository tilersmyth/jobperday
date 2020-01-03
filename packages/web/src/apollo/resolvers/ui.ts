import { ApolloCache } from 'apollo-cache';
import ApolloClient from 'apollo-client';
import { BreakpointEnum } from '../generated-components';

type GetCacheKey = (obj: { __typename: string; id: string | number }) => any;

interface ApolloContext {
  cache: ApolloCache<{}>;
  getCacheKey: GetCacheKey;
  client: ApolloClient<{}>;
}

interface Args {
  breakpoint: BreakpointEnum;
}

export const uiResolvers = {
  Mutation: {
    viewport: (_root: any, { breakpoint }: Args, { cache }: ApolloContext) => {
      cache.writeData({ data: { viewport: breakpoint } });
      return breakpoint;
    },
  },
};
