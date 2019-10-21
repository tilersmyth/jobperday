import React from 'react';
import Link from 'next/link';
import { Card, PageHeader, Icon, Result, Button } from 'antd';

import { FindCompanyQuery } from '../../../../apollo/generated-components';
import { CompanyLayout } from '../../shared/layout/company-layout/company-layout';
import './style.less';

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
    <CompanyLayout title="Setup Complete">
      <PageHeader
        className="steps-header"
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
            <Link key="home" href={`/employer/${company.slug}`}>
              <a>
                <Button>Home</Button>
              </a>
            </Link>,
            <Link
              key="create-job"
              href={`/employer/${company.slug}/jobs/create`}
            >
              <a>
                <Button type="primary">Create job</Button>
              </a>
            </Link>,
          ]}
        />
      </Card>
    </CompanyLayout>
  );
};
