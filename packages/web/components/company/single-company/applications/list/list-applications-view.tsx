import React from 'react';
import { Button } from 'antd';

import { CompanyCardContent, CompanyBreadcrumb } from '../../../shared';
import { CompanyLink } from '../../shared';

const breadcrumbRoutes: CompanyBreadcrumb[] = [
  { path: '/applications', title: 'Applications' },
];

const CreateApplicationButton: React.FunctionComponent = () => (
  <CompanyLink as={`/applications/create`} href={`/applications/create`}>
    <Button>Create Application</Button>
  </CompanyLink>
);

export const ListApplicationsView: React.FunctionComponent = () => (
  <CompanyCardContent
    breadcrumbs={breadcrumbRoutes}
    extra={<CreateApplicationButton />}
  >
    Applications yo
  </CompanyCardContent>
);
