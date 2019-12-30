import { ApolloCache } from 'apollo-cache';

import {
  PostingPartsFragmentDoc,
  PostingPartsFragment,
  FindAllPostingsDocument,
  FindAllPostingsQuery,
  PostingStatusEnum,
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
      const oldPostings = cache.readQuery<FindAllPostingsQuery>({
        query: FindAllPostingsDocument,
        variables: {
          companySlug: variables.companySlug,
          input: { status: PostingStatusEnum.Open, filter: {}, pagination: {} },
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
        query: FindAllPostingsDocument,
        variables: {
          companySlug: variables.companySlug,
          input: { status: PostingStatusEnum.Open, filter: {}, pagination: {} },
        },
        data: {
          findAllPostings: {
            count: oldPostings.findAllPostings.count + 1,
            postings: [newPosting, ...oldPostings.findAllPostings.postings],
            __typename: 'JobPostingResultsDto',
          },
        },
      });
      return null;
    },
  },
};
