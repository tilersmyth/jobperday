import * as React from 'react';
import { Row, Col } from 'antd';

interface Props {
  children: any;
}

export const SingleCompanyContainer: React.SFC<Props> = ({
  children,
}): JSX.Element => (
  <Row>
    <Col
      xl={{ span: 20, offset: 2 }}
      lg={{ span: 18, offset: 3 }}
      md={{ span: 20, offset: 2 }}
      xs={{ span: 24 }}
    >
      {children}
    </Col>
  </Row>
);
