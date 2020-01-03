import React from 'react';
import { Row, Col, Typography } from 'antd';
import Link from 'next/link';

export const LoginViewFooter: React.FunctionComponent = () => {
  return (
    <Row style={{ marginTop: 10 }}>
      <Col span={12}>
        <Link href="/register">
          <a>
            <Typography.Text type="secondary">
              Click here to register
            </Typography.Text>
          </a>
        </Link>
      </Col>
      <Col span={12} style={{ textAlign: 'right' }}>
        <Link href="/forgot-password">
          <a>
            <Typography.Text type="secondary">Forgot password?</Typography.Text>
          </a>
        </Link>
      </Col>
    </Row>
  );
};
