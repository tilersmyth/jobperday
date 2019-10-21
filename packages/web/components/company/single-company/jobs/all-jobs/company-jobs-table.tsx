import React from 'react';
import { Table } from 'antd';
import moment from 'moment';
import Link from 'next/link';

import { FindAllJobsQuery } from '../../../../../apollo/generated-components';

interface Props {
  jobs: FindAllJobsQuery['findAllJobs'];
  companySlug: string;
}

export const CompanyJobsTable: React.FunctionComponent<Props> = ({
  companySlug,
  jobs,
}) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: string, row: any) => (
        <Link href={`/employer/${companySlug}/jobs/${row.key}`}>
          <a>{name}</a>
        </Link>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Created',
      dataIndex: 'created',
      key: 'created',
    },
  ];

  const data = jobs.map(job => {
    return {
      key: job.slug,
      name: job.name,
      type: job.type,
      created: moment.utc(job.created_at).fromNow(),
    };
  });

  return <Table dataSource={data} columns={columns} />;
};
