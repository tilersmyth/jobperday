import React from 'react';
import { Row, Col, Card, PageHeader } from 'antd';

import { CreateCompanyStepsHeader } from './steps-header-view';
import { CreateCompanyStepsHelper } from './steps-helper-view';
import { CreateCompanyStepsContent } from './steps-content-view';
import { EmployerLayout } from '../../employer-layout';
import './style.less';

interface Props {
  step: number;
  companySlug?: string;
}

export const CreateCompanyView: React.SFC<Props> = ({
  step,
  companySlug,
}): JSX.Element => {
  return (
    <EmployerLayout title="Company Setup">
      <PageHeader
        style={{ marginTop: 20 }}
        onBack={() => null}
        title="Create company"
      />
      <Card bordered={false} style={{ marginTop: 20 }}>
        <CreateCompanyStepsHeader step={step} />
        <Row gutter={32}>
          <Col
            xs={{ span: 24 }}
            xl={{ span: 9, push: 15 }}
            className="steps-helper-container"
          >
            <CreateCompanyStepsHelper step={step} />
          </Col>
          <Col xs={{ span: 24 }} xl={{ span: 15, pull: 9 }}>
            <CreateCompanyStepsContent step={step} companySlug={companySlug} />
          </Col>
        </Row>
      </Card>
    </EmployerLayout>
  );
};
