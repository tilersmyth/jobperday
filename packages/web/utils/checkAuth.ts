import { NextPageContextApollo } from '../types';
import { MeDocument, MeQuery } from '../apollo/generated-components';

export const checkAuth = async (
  ctx: NextPageContextApollo,
): Promise<MeQuery['me'] | null> => {
  const { apolloClient } = ctx;
  const { data } = await apolloClient.query({ query: MeDocument });
  return data.me;
};
