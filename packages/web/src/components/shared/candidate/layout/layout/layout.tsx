import React from 'react';

import { RootLayout } from '../../../layout';
import { CandidateHeader } from '../header';
import { CandidateContent } from '../content';

interface Props {
  title: string;
  openDrawer?: (value: boolean) => void;
  children: any;
}

export const CandidateLayout: React.FunctionComponent<Props> = ({
  title,
  openDrawer,
  children,
}) => (
  <RootLayout title={title}>
    <CandidateHeader openDrawer={openDrawer} />
    <CandidateContent>{children}</CandidateContent>
  </RootLayout>
);
