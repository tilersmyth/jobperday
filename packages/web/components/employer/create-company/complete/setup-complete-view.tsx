import React from 'react';
import { Card, PageHeader, Icon, Result, Button } from 'antd';

import { FindCompanyQuery } from '../../../../apollo/generated-components';
import { EmployerLayout } from '../../employer-layout';

interface Props {
  company: FindCompanyQuery['findCompany'];
}

const Title: React.SFC<{ name: string }> = ({ name }) => (
  <React.Fragment>
    <strong>{name}</strong> account is under review!
  </React.Fragment>
);

export const SetupCompleteView: React.SFC<Props> = ({ company }) => {
  return (
    <EmployerLayout title="Setup Complete">
      <PageHeader
        style={{ marginTop: 20 }}
        onBack={() => null}
        backIcon={<Icon type="home" />}
        title="Company setup complete"
      />
      <Card bordered={false} style={{ marginTop: 20 }}>
        <Result
          status="success"
          title={<Title name={company.name} />}
          subTitle="Approval generally takes less than 24 hours. In the meantime create a job!"
          extra={[
            <Button key="buy">Home</Button>,
            <Button type="primary" key="console">
              Create job
            </Button>,
          ]}
        />
      </Card>
    </EmployerLayout>
  );
};
