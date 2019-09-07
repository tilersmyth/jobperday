import * as React from 'react';
import Head from 'next/head';
import { Layout } from 'antd';

interface Props {
  title: string;
}

export const RootLayout: React.SFC<Props> = ({
  children,
  title,
}): JSX.Element => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_PLACES_API}&libraries=places`}
      />
    </Head>
    <Layout>{children}</Layout>
  </div>
);
