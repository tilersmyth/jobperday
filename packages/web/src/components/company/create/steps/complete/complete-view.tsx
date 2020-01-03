import React from 'react';
import { Card, PageHeader, Result, Button, Row, Col } from 'antd';

import { FindCompanyQuery } from '../../../../../apollo';
import {
  CompanyHeader,
  CompanyContent,
  RootLayout,
  CompanyLink,
  Icon,
} from '../../../../shared';
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
              backIcon={<Icon type="home-line" />}
              title="Company setup complete"
            />
            <Card bordered={false} style={{ marginTop: 20 }}>
              <Result
                status="success"
                title={<Title name={company.name} />}
                subTitle="Approval generally takes less than 24 hours. In the meantime create a job!"
                extra={[
                  <CompanyLink key="home" as="" href="">
                    <Button>Home</Button>
                  </CompanyLink>,

                  <CompanyLink
                    key="create"
                    as={`/jobs/create`}
                    href="/jobs/create"
                  >
                    <Button type="primary">Create job</Button>
                  </CompanyLink>,
                ]}
              />
            </Card>
          </Col>
        </Row>
      </CompanyContent>
    </RootLayout>
  );
};
