import React from 'react';
import { Table } from 'antd';
import moment from 'moment';
import Link from 'next/link';
import { useQuery } from 'react-apollo';

import {
  FindAllJobsQuery,
  CurrentCompanyDocument,
} from '../../../../../apollo/generated-components';

interface Props {
  jobs: FindAllJobsQuery['findAllJobs'];
}

export const CompanyJobsTable: React.FunctionComponent<Props> = ({ jobs }) => {
  const {
    data: { currentCompany },
  } = useQuery<any>(CurrentCompanyDocument);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: string, row: any) => (
        <Link
          as={`/employer/${currentCompany.slug}/jobs/${row.key}`}
          href={`/employer/[company-slug]/jobs/[job-slug]`}
        >
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
