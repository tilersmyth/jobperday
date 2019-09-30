import React from 'react';
import { Row, Col, Button } from 'antd';

interface Props {
  step: number;
  lastStep?: () => void;
}

export const CreateCompanyStepsFooter: React.FunctionComponent<Props> = ({
  step,
  lastStep,
}) => {
  return (
    <Row>
      <Col xs={{ span: 12 }}>
        {lastStep && (
          <Button size="large" onClick={lastStep}>
            Previous
          </Button>
        )}
      </Col>
      <Col xs={{ span: 12 }} style={{ textAlign: 'right' }}>
        <Button size="large" type="primary" htmlType="submit">
          {step < 2 ? 'Next' : 'Complete'}
        </Button>
      </Col>
    </Row>
  );
};
