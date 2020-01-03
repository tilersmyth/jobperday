import { ApolloCache } from 'apollo-cache';
import { createCompanySteps } from '@jobperday/common';

import {
  CurrentCompanyDocument,
  FindCompanyProfileQuery,
  FindCompanyProfileDocument,
} from '../generated-components';

type GetCacheKey = (obj: { __typename: string; id: string | number }) => any;

interface ApolloContext {
  cache: ApolloCache<{}>;
  getCacheKey: GetCacheKey;
}

interface Args {
  input: FindCompanyProfileQuery['findCompanyProfile'];
}

export const companyProfileResolvers = {
  Mutation: {
    updateCompanyProfileClient: (
      _root: any,
      { input }: Args,
      { cache }: ApolloContext,
    ) => {
      const { currentCompany } = cache.readQuery<any>({
        query: CurrentCompanyDocument,
      });

      const setupStage = createCompanySteps.find(
        setup => setup.title.toLowerCase() === 'profile',
      );

      if (!setupStage) {
        console.log('resolver step error');
        return;
      }

      const nextStep = setupStage.step + 1;

      if (currentCompany.setup_stage < nextStep) {
        cache.writeQuery({
          query: CurrentCompanyDocument,
          data: {
            currentCompany: { ...currentCompany, setup_stage: nextStep },
          },
        });
      }

      cache.writeQuery<FindCompanyProfileQuery>({
        query: FindCompanyProfileDocument,
        data: {
          findCompanyProfile: input,
        },
        variables: {
          companySlug: currentCompany.slug,
        },
      });

      return true;
    },
  },
};
