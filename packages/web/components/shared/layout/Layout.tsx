import * as React from 'react';
import Head from 'next/head';
import { Layout as AntLayout } from 'antd';

interface Props {
  title: string;
}

export const Layout: React.SFC<Props> = ({ children, title }): JSX.Element => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <AntLayout>{children}</AntLayout>
  </div>
);
