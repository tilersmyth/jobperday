import React from 'react';
import { useQuery, QueryResult } from 'react-apollo';
import { postingPaginationConfig } from '@jobperday/common';
import { PaginationConfig } from 'antd/lib/table';
import { ApolloQueryResult } from 'apollo-client';

import {
  FindCurrentPostingsDocument,
  FindCurrentPostingsQuery,
  CurrentCompanyDocument,
} from '../../../../../apollo/generated-components';

interface CompanyDataProps extends QueryResult<FindCurrentPostingsQuery> {
  loadMore: (
    config: PaginationConfig,
  ) => {
    client: Promise<ApolloQueryResult<FindCurrentPostingsQuery>>;
    page?: number;
  };
}

interface Props {
  children: (company: CompanyDataProps) => any;
}

// Results to show per page
const queryLimit: number = postingPaginationConfig.limit;

export const CompanyPostingsData: React.FunctionComponent<Props> = ({
  children,
}) => {
  const {
    data: { currentCompany },
  } = useQuery<any>(CurrentCompanyDocument);

  const client = useQuery<FindCurrentPostingsQuery>(
    FindCurrentPostingsDocument,
    {
      variables: { companySlug: currentCompany.slug, input: {} },
      fetchPolicy: 'cache-and-network',
      ssr: false,
    },
  );

  const loadMore = ({ current }: PaginationConfig) => {
    const skip = current ? queryLimit * (current - 1) : 0;
    return {
      page: current,
      client: client.fetchMore({
        variables: {
          companySlug: currentCompany.slug,
          input: {
            skip,
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
      }),
    };
  };

  return children({ ...client, loadMore });
};
