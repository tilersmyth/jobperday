import React from 'react';
import { useQuery } from 'react-apollo';
import { postingPaginationConfig } from '@jobperday/common';

import {
  FindAllPostingsDocument,
  FindAllPostingsQuery,
  FindAllPostingsInput,
  PostingStatusEnum,
} from '../../../../apollo/generated-components';
import { OpenPostingsContent } from './content';

// Results to show per page
const queryLimit: number = postingPaginationConfig.limit;

interface Props {
  companySlug: string;
}

interface QueryInput {
  companySlug: string;
  input: FindAllPostingsInput;
}

export const OpenPostingListView: React.FunctionComponent<Props> = ({
  companySlug,
}) => {
  const { data, error, fetchMore } = useQuery<FindAllPostingsQuery, QueryInput>(
    FindAllPostingsDocument,
    {
      variables: {
        companySlug,
        input: { status: PostingStatusEnum.Open, filter: {}, pagination: {} },
      },
      fetchPolicy: 'cache-and-network',
    },
  );

  if (error || !data) {
    return null;
  }

  const loadMore = () => {
    return fetchMore({
      variables: {
        companySlug,
        input: {
          status: PostingStatusEnum.Open,
          filter: {},
          pagination: {
            skip: data.findAllPostings.postings.length,
            limit: queryLimit,
          },
        },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return prev;
        }

        return Object.assign({}, prev, {
          findAllPostings: {
            count: prev.findAllPostings.count,
            postings: [
              ...prev.findAllPostings.postings,
              ...fetchMoreResult.findAllPostings.postings,
            ],
            __typename: 'JobPostingResultsDto',
          },
        });
      },
    });
  };

  return (
    <OpenPostingsContent
      companySlug={companySlug}
      data={data}
      loadMore={loadMore}
    />
  );
};
