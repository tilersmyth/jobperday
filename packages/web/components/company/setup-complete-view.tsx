import React from 'react';
import { Card, PageHeader, Icon, Result, Button } from 'antd';

import { CompanyLayout } from './company-layout';
import { FindCompanyQuery } from '../../apollo/generated-components';

interface Props {
  company: FindCompanyQuery['findCompany'];
}

export const SetupCompleteView: React.SFC<Props> = ({ company }) => {
  return (
    <CompanyLayout>
      <PageHeader
        style={{ marginTop: 20 }}
        onBack={() => null}
        backIcon={<Icon type="home" />}
        title="Company setup complete"
      />
      <Card bordered={false} style={{ marginTop: 20 }}>
        <Result
          status="success"
          title={`Account for ${company.name} has been submitted!`}
          subTitle="Approval generally takes less than 24 hours. In the meantime create a job!"
          extra={[
            <Button key="buy">Home</Button>,
            <Button type="primary" key="console">
              Create job
            </Button>,
          ]}
        />
      </Card>
    </CompanyLayout>
  );
};
