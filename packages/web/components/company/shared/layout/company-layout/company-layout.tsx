import React from 'react';
import { Layout } from 'antd';

import { RootLayout } from '../../../../shared/layout';
import { CompanyHeader } from '../header';
import './style.less';

const { Content } = Layout;

interface Props {
  title: string;
  children: any;
}

export const CompanyLayout: React.SFC<Props> = ({
  title,
  children,
}): JSX.Element => {
  return (
    <RootLayout title={title}>
      <CompanyHeader />
      <Content className="company_container">{children}</Content>
    </RootLayout>
  );
};
