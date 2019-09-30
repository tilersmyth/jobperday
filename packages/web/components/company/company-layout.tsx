import React from 'react';
import { Layout } from 'antd';

import { RootLayout, ResponsiveWrapper, Header } from '../shared/layout';

const { Content } = Layout;

interface Props {
  children: any;
}

export const CompanyLayout: React.SFC<Props> = ({ children }): JSX.Element => {
  return (
    <RootLayout title="Company">
      <Header />
      <Content style={{ padding: '64px 10px 0 10px' }}>
        <ResponsiveWrapper>{children}</ResponsiveWrapper>
      </Content>
    </RootLayout>
  );
};
