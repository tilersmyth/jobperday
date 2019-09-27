import React from 'react';
import { Row, Col, Layout } from 'antd';

import { ResponsiveWrapper } from '../shared/layout/responsive-wrapper';
import './style.less';
import { RootLayout, Header } from '../shared/layout';

const { Content } = Layout;

interface Props {
  searchbar: any;
  sidebar: any;
  results: any;
}

export const SearchLayout: React.SFC<Props> = ({
  searchbar,
  sidebar,
  results,
}): JSX.Element => {
  return (
    <RootLayout title="Search">
      <Header />
      {searchbar}
      <Content style={{ padding: '0 10px' }}>
        <ResponsiveWrapper>
          <div className="wrapper">
            <Row gutter={{ xs: 0, lg: 16, xl: 24 }}>
              <Col xl={{ span: 8 }} lg={{ span: 8 }} xs={{ span: 0 }}>
                {sidebar}
              </Col>
              <Col xl={{ span: 16 }} lg={{ span: 16 }} xs={{ span: 24 }}>
                {results}
              </Col>
            </Row>
          </div>
        </ResponsiveWrapper>
      </Content>
    </RootLayout>
  );
};
