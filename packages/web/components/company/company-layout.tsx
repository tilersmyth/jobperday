import React from 'react';
import { Layout, Row, Col, Card, PageHeader } from 'antd';

import { RootLayout, ResponsiveWrapper, Header } from '../shared/layout';
import './style.less';

const { Content } = Layout;

interface Props {
  header: any;
  content: any;
  helper: any;
}

export const CompanyLayout: React.SFC<Props> = ({
  header,
  content,
  helper,
}): JSX.Element => {
  return (
    <RootLayout title="Company">
      <Header />
      <Content style={{ padding: '64px 10px 0 10px' }}>
        <ResponsiveWrapper>
          <PageHeader
            style={{ marginTop: 20 }}
            onBack={() => null}
            title="Create company"
          />
          <Card bordered={false} style={{ marginTop: 20 }}>
            {header}
            <Row gutter={32}>
              <Col
                xs={{ span: 24 }}
                xl={{ span: 9, push: 15 }}
                className="steps-helper-container"
              >
                {helper}
              </Col>
              <Col xs={{ span: 24 }} xl={{ span: 15, pull: 9 }}>
                {content}
              </Col>
            </Row>
          </Card>
        </ResponsiveWrapper>
      </Content>
    </RootLayout>
  );
};
