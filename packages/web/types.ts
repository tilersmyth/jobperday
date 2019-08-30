import { NextPageContext } from 'next';
import { ApolloClient, NormalizedCacheObject } from 'apollo-boost';

export interface NextPageContextApollo extends NextPageContext {
  apolloClient: ApolloClient<NormalizedCacheObject>;
}
