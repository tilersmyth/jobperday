import { ApolloCache } from 'apollo-cache';

import {
  FindEmployerCompanyQuery,
  CurrentCompanyDocument,
} from '../generated-components';

type GetCacheKey = (obj: { __typename: string; id: string | number }) => any;

interface ApolloContext {
  cache: ApolloCache<{}>;
  getCacheKey: GetCacheKey;
}

export const companyResolvers = {
  Query: {
    setCompany: (
      root: FindEmployerCompanyQuery,
      __: {},
      { cache }: ApolloContext,
    ) => {
      const { findEmployerCompany } = root;

      cache.writeQuery({
        query: CurrentCompanyDocument,
        data: { currentCompany: findEmployerCompany },
      });

      return true;
    },
  },
};
