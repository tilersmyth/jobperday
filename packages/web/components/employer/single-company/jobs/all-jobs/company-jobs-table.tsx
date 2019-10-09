import React from 'react';
import { Table } from 'antd';
import moment from 'moment';

import { FindAllJobsQuery } from '../../../../../apollo/generated-components';

interface Props {
  jobs: FindAllJobsQuery['findAllJobs'];
}

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text: string) => <a>{text}</a>,
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

export const CompanyJobsTable: React.FunctionComponent<Props> = ({ jobs }) => {
  const currentTime = moment();
  console.log(currentTime);

  const data = jobs.map(job => {
    return {
      key: job.id,
      name: job.name,
      type: job.type,
      created: moment.utc(job.created_at).fromNow(),
    };
  });

  return <Table dataSource={data} columns={columns} />;
};
