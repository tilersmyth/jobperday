import * as React from 'react';
import { Layout } from 'antd';

import { RootLayout, Header } from '../shared/layout';
import { SearchBar } from '../shared/layout/search-bar/search-bar';

const { Content } = Layout;

interface Props {
  title: string;
}

export const SearchLayout: React.SFC<Props> = ({
  children,
  title,
}): JSX.Element => (
  <RootLayout title={title}>
    <Header />
    <SearchBar />
    <Content style={{ padding: '0 50px' }}>{children}</Content>
  </RootLayout>
);
