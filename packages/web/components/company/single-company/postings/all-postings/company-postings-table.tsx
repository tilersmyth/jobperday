import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Table } from 'antd';
import { PaginationConfig } from 'antd/lib/table';
import { ApolloQueryResult } from 'apollo-boost';
import Link from 'next/link';
import { postingPaginationConfig } from '@jobperday/common';

import {
  FindCurrentPostingsQuery,
  CurrentCompanyDocument,
} from '../../../../../apollo/generated-components';
import { useQuery } from 'react-apollo';

interface Props {
  loading: boolean;
  data: FindCurrentPostingsQuery['findCurrentPostings'];
  onLoadMore: (
    config: PaginationConfig,
  ) => {
    client: Promise<ApolloQueryResult<FindCurrentPostingsQuery>>;
    page?: number;
  };
}

export const CompanyPostingsTable: React.FunctionComponent<Props> = ({
  data,
  loading,
  onLoadMore,
}) => {
  const {
    data: { currentCompany },
  } = useQuery<any>(CurrentCompanyDocument);

  const columns = [
    {
      title: 'Job',
      dataIndex: 'job',
      key: 'job',
      render: (name: string, row: any) => (
        <Link
          as={`/employer/${currentCompany.slug}/postings/${row.key}`}
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

  const [config, setConfig] = useState({ page: 1, data, loading });

  useEffect(() => {
    setConfig({ page: 1, data, loading });
  }, [data]);

  const dataSource = config.data.postings.map(post => {
    return {
      key: post.id,
      job: post.job.name,
      rate: `$${post.pay_rate.toFixed(2)}`,
      openings: post.total_openings,
      start: moment.utc(post.start_date).format('h:mm a, MM/DD/YY'),
      end: moment.utc(post.end_date).format('h:mm a, MM/DD/YY'),
      deadline: moment.utc(post.apply_deadline).fromNow(),
    };
  });

  return (
    <Table
      loading={config.loading}
      dataSource={dataSource}
      columns={columns}
      onChange={async update => {
        const refetch = onLoadMore(update);
        const client = await refetch.client;

        if (client.errors) {
          return null;
        }

        const refetchData = client.data;

        setConfig({
          page: refetch.page || config.page,
          loading: client.loading,
          data: (refetchData && refetchData.findCurrentPostings) || config.data,
        });
      }}
      pagination={{
        pageSize: postingPaginationConfig.limit,
        total: config.data.count,
        current: config.page,
      }}
    />
  );
};
