import React from 'react';
import Link from 'next/link';
import { Card, PageHeader, Icon, Result, Button, Row, Col } from 'antd';

import { FindCompanyQuery } from '../../../../../apollo';
import { CompanyHeader, CompanyContent, RootLayout } from '../../../../shared';
import styles from './style.less';

interface Props {
  company: FindCompanyQuery['findCompany'];
}

const Title: React.SFC<{ name: string }> = ({ name }) => (
  <React.Fragment>
    <strong>{name}</strong> account is under review!
  </React.Fragment>
);

export const CreateCompanyCompleteView: React.SFC<Props> = ({ company }) => {
  return (
    <RootLayout title="Create Company Complete">
      <CompanyHeader />
      <CompanyContent>
        <Row>
          <Col
            xl={{ span: 16, offset: 4 }}
            lg={{ span: 18, offset: 3 }}
            md={{ span: 20, offset: 2 }}
            xs={{ span: 24 }}
          >
            <PageHeader
              className={styles.header}
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
          </Col>
        </Row>
      </CompanyContent>
    </RootLayout>
  );
};
