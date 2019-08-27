import React from 'react';
import { Row, Col, Typography } from 'antd';

import { Layout } from '../shared/layout/Layout';

interface Props {
  children: any;
  title: string;
}

export const AuthLayout: React.FunctionComponent<Props> = ({
  children,
  title,
}) => {
  return (
    <Layout title={title}>
      <Row type="flex" align="middle" style={{ minHeight: '80vh' }}>
        <Col
          lg={{ span: 6, offset: 9 }}
          md={{ span: 10, offset: 7 }}
          xs={{ span: 20, offset: 2 }}
        >
          <div>
            <Typography.Title
              level={2}
              style={{ textAlign: 'center', marginTop: 30, marginBottom: 20 }}
            >
              {title}
            </Typography.Title>
            {children}
          </div>
        </Col>
      </Row>
    </Layout>
  );
};
