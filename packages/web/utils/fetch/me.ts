import { NextPageContextApollo } from '../../types';
import { MeDocument, MeQuery } from '../../apollo/generated-components';

export const fetchMe = async (
  ctx: NextPageContextApollo,
): Promise<MeQuery['me'] | null> => {
  const { apolloClient } = ctx;
  const { data } = await apolloClient.query<MeQuery>({ query: MeDocument });
  return data.me;
};
