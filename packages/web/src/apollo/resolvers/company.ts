import { ApolloCache } from 'apollo-cache';

import {
  CurrentCompanyDocument,
  FindCompanyQuery,
} from '../generated-components';

type GetCacheKey = (obj: { __typename: string; id: string | number }) => any;

interface ApolloContext {
  cache: ApolloCache<{}>;
  getCacheKey: GetCacheKey;
}

export const companyResolvers = {
  Query: {
    setCompany: (
      { findCompany }: FindCompanyQuery,
      __: {},
      { cache }: ApolloContext,
    ) => {
      // need to accomodate company setup as well
      // Finding current company should be combined at some point
      // it comes down to varying role requirements (setup requires owner)
      // const currentCompany = root.findEmployerCompany
      //   ? root.findEmployerCompany
      //   : root.findSetupCompany;

      cache.writeQuery({
        query: CurrentCompanyDocument,
        data: { currentCompany: findCompany },
      });

      return true;
    },
  },
};
