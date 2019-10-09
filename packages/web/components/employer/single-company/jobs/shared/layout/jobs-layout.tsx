import React from 'react';
import { Card } from 'antd';

import { JobsBreadcrumbNav, JobsBreadcrumb } from '../jobs-breadcrumb';

interface Props {
  children: any;
  breadcrumbs: JobsBreadcrumb[];
  companySlug: string;
  extra?: React.ReactNode;
}

export const JobsLayout: React.FunctionComponent<Props> = ({
  children,
  breadcrumbs,
  companySlug,
  extra,
}) => (
  <Card
    bordered={false}
    title={<JobsBreadcrumbNav routes={breadcrumbs} companySlug={companySlug} />}
    extra={extra}
  >
    {children}
  </Card>
);
