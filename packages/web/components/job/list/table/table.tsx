import React from 'react';
import { Table, Tag } from 'antd';
import moment from 'moment';
import Link from 'next/link';
import { useQuery } from 'react-apollo';

import {
  FindAllJobsDocument,
  FindAllJobsQuery,
} from '../../../../apollo/generated-components';
import './style.less';

interface Props {
  companySlug: string;
}

export const JobsTable: React.FunctionComponent<Props> = ({ companySlug }) => {
  const { loading, data, error } = useQuery<FindAllJobsQuery>(
    FindAllJobsDocument,
    {
      variables: { companySlug },
    },
  );

  if (error || !data) {
    return null;
  }

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (title: string, row: any) => (
        <Link
          as={`/employer/${companySlug}/jobs/${row.key}`}
          href={`/employer/[company-slug]/jobs/[job-id]`}
        >
          <a>{title}</a>
        </Link>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags: string[]) => (
        <span>
          {tags.map(tag => (
            <Tag color="blue" key={tag}>
              {tag}
            </Tag>
          ))}
        </span>
      ),
    },
    {
      title: 'Created',
      dataIndex: 'created',
      key: 'created',
    },
  ];

  const jobsData = (data.findAllJobs || []).map(job => {
    return {
      key: job.id,
      title: job.title,
      type: job.type,
      tags: job.tags,
      created: moment.utc(job.created_at).fromNow(),
    };
  });

  return (
    <Table
      className="jobs-list-table"
      dataSource={jobsData}
      loading={loading}
      columns={columns}
    />
  );
};
