import React from 'react';
import { Row, Col, Button } from 'antd';
import Router from 'next/router';
import { createCompanySteps } from '@jobperday/common';
import { useQuery } from 'react-apollo';

import { CurrentCompanyDocument } from '../../../../apollo';

interface Props {
  step: number;
}

export const CreateCompanyStepsActions: React.FunctionComponent<Props> = ({
  step,
}) => {
  const {
    data: { currentCompany },
  } = useQuery<any>(CurrentCompanyDocument);

  const goToPrevious = () => {
    const last = createCompanySteps.find(s => s.step === step - 1);

    if (!last) {
      return;
    }

    Router.push(
      `/company/create/[slug]/${last.title.toLowerCase()}`,
      `/company/create/${currentCompany.slug}/${last.title.toLowerCase()}`,
    );
  };

  return (
    <Row>
      <Col xs={{ span: 12 }}>
        {step > 0 && (
          <Button size="large" onClick={goToPrevious}>
            Previous
          </Button>
        )}
      </Col>
      <Col xs={{ span: 12 }} style={{ textAlign: 'right' }}>
        <Button size="large" type="primary" htmlType="submit">
          {step < createCompanySteps.length - 1 ? 'Next' : 'Complete'}
        </Button>
      </Col>
    </Row>
  );
};
