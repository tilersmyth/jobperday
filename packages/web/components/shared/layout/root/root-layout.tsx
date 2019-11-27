import * as React from 'react';
import { useMutation } from 'react-apollo';
import Head from 'next/head';
import { Layout } from 'antd';
import ReactResizeDetector from 'react-resize-detector';

import {
  ViewportMutationDocument,
  ViewportMutationMutation,
} from '../../../../apollo';
import { uiBreakpoint } from '../../../../utils';

interface Props {
  title: string;
}

export const RootLayout: React.SFC<Props> = ({
  children,
  title,
}): JSX.Element => {
  const [setViewport, { data }] = useMutation<ViewportMutationMutation>(
    ViewportMutationDocument,
  );

  const onWidthResize = (width: number) => {
    const breakpoint = uiBreakpoint(width);
    if (!data || data.viewport !== breakpoint) {
      setViewport({
        variables: {
          breakpoint,
        },
      });
    }
  };
  return (
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
      <ReactResizeDetector handleWidth={true} onResize={onWidthResize} />
    </div>
  );
};
