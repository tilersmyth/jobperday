import React, { ReactNode } from 'react';
import { useQuery } from 'react-apollo';
import { Row, Col, Card, PageHeader, Steps, Spin } from 'antd';
import { createCompanySteps } from '@jobperday/common';

import {
  CurrentCompanyDocument,
  CurrentCompanyQuery,
} from '../../../../../apollo';
import { CompanyHeader, CompanyContent, RootLayout } from '../../../../shared';
import './style.less';

const { Step } = Steps;

interface Props {
  step: number;
  formLoading: boolean;
  form: ReactNode;
  helper: ReactNode;
}

export const CreateCompanyLayout: React.SFC<Props> = ({
  step,
  formLoading,
  form,
  helper,
}) => {
  const { loading, data, error } = useQuery<CurrentCompanyQuery>(
    CurrentCompanyDocument,
  );

  if (error || !data || loading) {
    return null;
  }

  const { currentCompany } = data;

  return (
    <RootLayout title="Create Company">
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
              className="steps-header"
              onBack={() => null}
              title={currentCompany ? currentCompany.name : 'Create Company'}
            />
            <Card bordered={false} style={{ marginTop: 20 }}>
              <Steps size="small" current={step}>
                {createCompanySteps.map(s => (
                  <Step key={s.step} title={s.title} />
                ))}
              </Steps>
              <Row gutter={32} className="steps-container">
                <Col
                  xs={{ span: 24 }}
                  xl={{ span: 9, push: 15 }}
                  className="steps-helper-container"
                >
                  {helper}
                </Col>
                <Col
                  xs={{ span: 24 }}
                  xl={{ span: 15, pull: 9 }}
                  className="steps-content-container"
                >
                  {formLoading && <Spin />}
                  {form}
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </CompanyContent>
    </RootLayout>
  );
};
