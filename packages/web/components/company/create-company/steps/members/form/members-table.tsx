import React from 'react';
import { useQuery } from 'react-apollo';
import { Tag, Button, Table } from 'antd';

import {
  FindCompanyMembersQuery,
  FindCompanyMembersDocument,
  CurrentCompanyDocument,
} from '../../../../../../apollo';

interface Props {
  formData: FindCompanyMembersQuery['findCompanyMembers'];
}

export const CompanyMembersTable: React.FunctionComponent<Props> = ({
  formData,
}) => {
  const {
    data: { currentCompany },
  } = useQuery<any>(CurrentCompanyDocument);

  const { loading, error, data } = useQuery<FindCompanyMembersQuery>(
    FindCompanyMembersDocument,
    {
      variables: { companySlug: currentCompany.slug },
    },
  );

  if (error || !data) {
    return <div>Error loading data</div>;
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },

    {
      title: 'E-mail',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => (
        <Tag color="blue" key={role}>
          {role.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (member: any) => {
        return (
          <Button
            type="link"
            icon="delete"
            disabled={member.role === 'owner'}
          />
        );
      },
    },
  ];

  const existingData = loading ? [] : data.findCompanyMembers;

  const tableData = [...existingData, ...formData].map(member => {
    return {
      key: member.id,
      name: `${member.user.first_name} ${member.user.last_name}`,
      email: member.user.email,
      role: member.role,
    };
  });

  return (
    <Table
      loading={loading}
      style={{ marginBottom: 24 }}
      columns={columns}
      dataSource={tableData}
      pagination={false}
    />
  );
};
