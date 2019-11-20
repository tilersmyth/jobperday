import React from 'react';
import { Table } from 'antd';
import moment from 'moment';
import Link from 'next/link';
import { useQuery } from 'react-apollo';
import { postingPaginationConfig } from '@jobperday/common';

import {
  FindCurrentPostingsQuery,
  FindCurrentPostingsDocument,
} from '../../../../apollo/generated-components';
import './style.less';

interface Props {
  companySlug: string;
}

// Results to show per page
const queryLimit: number = postingPaginationConfig.limit;

export const JobPostingsTable: React.FunctionComponent<Props> = ({
  companySlug,
}) => {
  const { loading, data, error, fetchMore } = useQuery<
    FindCurrentPostingsQuery
  >(FindCurrentPostingsDocument, {
    variables: { companySlug, input: {} },
    fetchPolicy: 'cache-and-network',
    ssr: false,
  });

  if (error || !data) {
    return null;
  }

  // const loadMore = ({ current }: PaginationConfig) => {
  //   const skip = current ? queryLimit * (current - 1) : 0;
  //   return {
  //     page: current,
  //     client: fetchMore({
  //       variables: {
  //         companySlug,
  //         input: {
  //           skip,
  //           limit: queryLimit,
  //         },
  //       },
  //       updateQuery: (prev, { fetchMoreResult }) => {
  //         if (!fetchMoreResult) {
  //           return prev;
  //         }

  //         return Object.assign({}, prev, {
  //           count: prev.findCurrentPostings.count,
  //           postings: [
  //             ...prev.findCurrentPostings.postings,
  //             ...fetchMoreResult.findCurrentPostings.postings,
  //           ],
  //         });
  //       },
  //     }),
  //   };
  // };

  const columns = [
    {
      title: 'Job',
      dataIndex: 'job',
      key: 'job',
      render: (name: string, row: any) => (
        <Link
          as={`/employer/${companySlug}/postings/${row.key}`}
          href={`/employer/[company-slug]/postings/[posting-id]`}
        >
          <a>{name}</a>
        </Link>
      ),
    },
    {
      title: 'Hourly rate',
      dataIndex: 'rate',
      key: 'rate',
    },
    {
      title: 'Openings',
      dataIndex: 'openings',
      key: 'openings',
    },
    {
      title: 'Start',
      dataIndex: 'start',
      key: 'start',
    },
    {
      title: 'End',
      dataIndex: 'end',
      key: 'end',
    },
    {
      title: 'Deadline',
      dataIndex: 'deadline',
      key: 'deadline',
    },
  ];

  const postingsList = data.findCurrentPostings
    ? data.findCurrentPostings.postings
    : [];

  const dataSource = postingsList.map(post => {
    return {
      key: post.id,
      job: post.job.title,
      rate: `$${post.pay_rate.toFixed(2)}`,
      openings: post.total_openings,
      start: moment.utc(post.start_date).format('h:mm a, MM/DD/YY'),
      end: moment.utc(post.end_date).format('h:mm a, MM/DD/YY'),
      deadline: moment.utc(post.apply_deadline).fromNow(),
    };
  });

  return (
    <Table
      className="job-postings-list-table"
      dataSource={dataSource}
      loading={loading}
      columns={columns}
      onChange={async ({ current }) =>
        fetchMore({
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
        })
      }
    />
  );
};
