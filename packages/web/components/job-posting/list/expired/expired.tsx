import React from 'react';
import { useQuery } from 'react-apollo';
import { postingPaginationConfig } from '@jobperday/common';
import { PaginationConfig } from 'antd/lib/table';

import {
  FindCurrentPostingsQuery,
  FindCurrentPostingsDocument,
} from '../../../../apollo/generated-components';
import { ExpiredPostingsTable } from './table';

// Results to show per page
const queryLimit: number = postingPaginationConfig.limit;

interface Props {
  companySlug: string;
}

export const ExpiredPostingListView: React.FunctionComponent<Props> = ({
  companySlug,
}) => {
  const client = useQuery<FindCurrentPostingsQuery>(
    FindCurrentPostingsDocument,
    {
      variables: { companySlug, input: {} },
      fetchPolicy: 'cache-and-network',
      ssr: false,
    },
  );

  const loadMore = async ({ current }: PaginationConfig) => {
    return client.fetchMore({
      variables: {
        companySlug,
        input: {
          skip: current ? queryLimit * (current - 1) : 0,
          limit: queryLimit,
        },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return prev;
        }

        return Object.assign({}, prev, {
          count: prev.findCurrentPostings.count,
          postings: [
            ...prev.findCurrentPostings.postings,
            ...fetchMoreResult.findCurrentPostings.postings,
          ],
        });
      },
    });
  };

  return <ExpiredPostingsTable client={client} loadMore={loadMore} />;
};
