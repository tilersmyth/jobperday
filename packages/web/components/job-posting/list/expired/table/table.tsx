import React from 'react';
import { Table } from 'antd';
import moment from 'moment';
import Link from 'next/link';
import { QueryResult } from 'react-apollo';
import { PaginationConfig } from 'antd/lib/table';
import { ApolloQueryResult } from 'apollo-client';

import { FindCurrentPostingsQuery } from '../../../../../apollo/generated-components';
import { PostingsNoData } from '../../shared';
import styles from './style.less';

interface Props {
  client: QueryResult<FindCurrentPostingsQuery, Record<string, any>>;
  loadMore: (
    pagination: PaginationConfig,
  ) => Promise<ApolloQueryResult<FindCurrentPostingsQuery>>;
}

export const ExpiredPostingsTable: React.FunctionComponent<Props> = ({
  client: { loading, error, data, variables },
  loadMore,
}) => {
  if (error || !data) {
    return null;
  }

  const columns = [
    {
      title: 'Job',
      dataIndex: 'job',
      key: 'job',
      render: (name: string, row: any) => (
        <Link
          as={`/employer/${variables.companySlug}/postings/${row.key}`}
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
      className={styles.container}
      dataSource={dataSource}
      loading={loading}
      columns={columns}
      onChange={loadMore}
      locale={{
        emptyText: () => (
          <PostingsNoData>No expired postings found</PostingsNoData>
        ),
      }}
    />
  );
};
