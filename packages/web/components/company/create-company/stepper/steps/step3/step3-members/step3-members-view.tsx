import React from 'react';
import { Table, Tag, Button } from 'antd';

import { FindCreateCompanyMembersQuery } from '../../../../../../../apollo/generated-components';
import { MembersTableFooter } from './members-table-footer';

interface Props {
  members: FindCreateCompanyMembersQuery['findCreateCompanyMembers'];
}

export const Step3MembersView: React.FunctionComponent<Props> = ({
  members,
}) => {
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

  const data = members.map(member => {
    return {
      key: member.id,
      name: `${member.user.first_name} ${member.user.last_name}`,
      email: member.user.email,
      role: member.role,
    };
  });

  return (
    <Table
      style={{ marginBottom: 24 }}
      columns={columns}
      dataSource={data}
      footer={MembersTableFooter}
      pagination={false}
    />
  );
};
