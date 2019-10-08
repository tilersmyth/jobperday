import React from 'react';
import { Layout } from 'antd';

import { RootLayout, ResponsiveWrapper, Header } from '../shared/layout';

const { Content } = Layout;

interface Props {
  title: string;
  children: any;
}

export const EmployerLayout: React.SFC<Props> = ({
  title,
  children,
}): JSX.Element => {
  return (
    <RootLayout title={`Employer » ${title}`}>
      <Header />
      <Content style={{ padding: '64px 10px 50px 10px' }}>
        <ResponsiveWrapper>{children}</ResponsiveWrapper>
      </Content>
    </RootLayout>
  );
};
