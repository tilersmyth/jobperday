import { ApolloCache } from 'apollo-cache';

import { FindAllJobsQuery, FindAllJobsDocument } from '../generated-components';

type GetCacheKey = (obj: { __typename: string; id: string | number }) => any;

interface ApolloContext {
  cache: ApolloCache<{}>;
  getCacheKey: GetCacheKey;
}

interface Args {
  companySlug: string;
  input: FindAllJobsQuery;
}

export const jobResolvers = {
  Mutation: {
    updateJobList: (
      _root: any,
      { companySlug, input }: Args,
      { cache }: ApolloContext,
    ) => {
      try {
        const cacheResults = cache.readQuery<FindAllJobsQuery>({
          query: FindAllJobsDocument,
          variables: { companySlug },
        });

        if (!cacheResults) {
          throw Error('Add job to job list cache failed');
        }

        cache.writeQuery({
          query: FindAllJobsDocument,
          variables: { companySlug },
          data: { findAllJobs: [input, ...cacheResults.findAllJobs] },
        });
      } catch (err) {
        return false;
      }

      return true;
    },
  },
};
