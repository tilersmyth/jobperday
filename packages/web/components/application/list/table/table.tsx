import React from 'react';
import { Table } from 'antd';
import Link from 'next/link';
import { useQuery } from 'react-apollo';
import moment from 'moment';

import {
  FindAllApplicationsDocument,
  FindAllApplicationsQuery,
} from '../../../../apollo/generated-components';
import styles from './style.less';

interface Props {
  companySlug: string;
}

export const ApplicationsTable: React.FunctionComponent<Props> = ({
  companySlug,
}) => {
  const { loading, data, error } = useQuery<FindAllApplicationsQuery>(
    FindAllApplicationsDocument,
    {
      variables: { companySlug },
    },
  );

  if (error || !data) {
    return null;
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (title: string, row: any) => (
        <Link
          as={`/employer/${companySlug}/applications/${row.key}`}
          href={`/employer/[company-slug]/applications/[job-id]`}
        >
          <a>{title}</a>
        </Link>
      ),
    },
    {
      title: 'Created',
      dataIndex: 'created',
      key: 'created',
    },
  ];

  const jobsData = (data.findAllApplications || []).map(app => {
    return {
      key: app.id,
      id: app.id,
      title: app.title,
      created: moment.utc(app.created_at).fromNow(),
    };
  });

  return (
    <Table
      className={styles.container}
      dataSource={jobsData}
      loading={loading}
      columns={columns}
    />
  );
};
