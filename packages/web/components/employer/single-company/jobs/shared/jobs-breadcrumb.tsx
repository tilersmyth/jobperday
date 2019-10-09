import React from 'react';
import Link from 'next/link';
import { Breadcrumb } from 'antd';

export interface JobsBreadcrumb {
  title: string;
  path: string;
}

interface Props {
  routes: JobsBreadcrumb[];
  companySlug: string;
}

export const JobsBreadcrumbNav: React.FunctionComponent<Props> = ({
  routes,
  companySlug,
}) => {
  return (
    <Breadcrumb>
      {routes.map(route => (
        <Breadcrumb.Item key={route.path}>
          {routes.length - 1 === routes.indexOf(route) ? (
            <span>{route.title}</span>
          ) : (
            <Link href={`/employer/${companySlug}/jobs${route.path}`}>
              <a>{route.title}</a>
            </Link>
          )}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};
