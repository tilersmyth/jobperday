import { ApolloCache } from 'apollo-cache';

import {
  PostingPartsFragmentDoc,
  FindCurrentPostingsDocument,
  FindCurrentPostingsQuery,
  PostingPartsFragment,
} from '../generated-components';

interface Variables {
  companySlug: string;
  postingId: string;
}

type GetCacheKey = (obj: { __typename: string; id: string | number }) => any;

interface ApolloContext {
  cache: ApolloCache<{}>;
  getCacheKey: GetCacheKey;
}

export const postingResolvers = {
  Mutation: {
    createPostingClient: (
      _root: any,
      variables: Variables,
      { cache, getCacheKey }: ApolloContext,
    ) => {
      const oldPostings = cache.readQuery<FindCurrentPostingsQuery>({
        query: FindCurrentPostingsDocument,
        variables: {
          companySlug: variables.companySlug,
          input: {},
        },
      });

      if (!oldPostings) {
        throw Error('Error adding new posting to cache');
      }

      const cacheId = getCacheKey({
        __typename: 'JobPostingDto',
        id: variables.postingId,
      });

      const newPosting = cache.readFragment<PostingPartsFragment>({
        fragment: PostingPartsFragmentDoc,
        id: cacheId,
      });

      cache.writeQuery({
        query: FindCurrentPostingsDocument,
        variables: {
          companySlug: variables.companySlug,
          input: {},
        },
        data: {
          findCurrentPostings: {
            count: oldPostings.findCurrentPostings.count + 1,
            postings: [newPosting, ...oldPostings.findCurrentPostings.postings],
            __typename: 'JobPostingResultsDto',
          },
        },
      });
      return null;
    },
  },
};
