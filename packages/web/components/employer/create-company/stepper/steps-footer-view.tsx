import React from 'react';
import { Row, Col, Button } from 'antd';
import { createCompanySteps } from '@jobperday/common';

interface Props {
  step: number;
  previousStep?: () => void;
}

export const CreateCompanyStepsFooter: React.FunctionComponent<Props> = ({
  step,
  previousStep,
}) => {
  return (
    <Row>
      <Col xs={{ span: 12 }}>
        {previousStep && (
          <Button size="large" onClick={previousStep}>
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
