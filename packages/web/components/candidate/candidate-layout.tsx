import * as React from 'react';

import { RootLayout, Header } from '../shared/layout';

interface Props {
  title: string;
}

export const CandidateLayout: React.SFC<Props> = ({
  children,
  title,
}): JSX.Element => (
  <RootLayout title={title}>
    <Header />
    {children}
  </RootLayout>
);
