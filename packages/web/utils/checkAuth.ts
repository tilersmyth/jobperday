import { NextPageContextApollo } from '../types';
import { MeDocument } from '../apollo/generated-components';
import { redirect } from '../apollo/redirect';

export const checkAuth = async (ctx: NextPageContextApollo) => {
  const { apolloClient } = ctx;

  try {
    await apolloClient.query({ query: MeDocument });
  } catch (err) {
    redirect(ctx, '/login');
  }
};
