import { ApolloCache } from 'apollo-cache';
import { createCompanySteps } from '@jobperday/common';

import {
  CurrentCompanyDocument,
  FindCompanyContactDocument,
  FindCompanyContactQuery,
} from '../generated-components';

type GetCacheKey = (obj: { __typename: string; id: string | number }) => any;

interface ApolloContext {
  cache: ApolloCache<{}>;
  getCacheKey: GetCacheKey;
}

interface Args {
  input: FindCompanyContactQuery['findCompanyContact'];
}

export const companyContactResolvers = {
  Mutation: {
    updateCompanyContactClient: (
      _root: any,
      { input }: Args,
      { cache }: ApolloContext,
    ) => {
      const { currentCompany } = cache.readQuery<any>({
        query: CurrentCompanyDocument,
      });

      const setupStage = createCompanySteps.find(
        setup => setup.title.toLowerCase() === 'contact',
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

      cache.writeQuery<FindCompanyContactQuery>({
        query: FindCompanyContactDocument,
        data: {
          findCompanyContact: input,
        },
        variables: {
          companySlug: currentCompany.slug,
        },
      });

      return true;
    },
  },
};
