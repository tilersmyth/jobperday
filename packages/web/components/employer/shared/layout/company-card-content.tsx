import React from 'react';
import { Card, Breadcrumb } from 'antd';
import Link from 'next/link';

export interface CompanyBreadcrumb {
  title: string;
  path: string;
}

interface Props {
  children: any;
  breadcrumbs: CompanyBreadcrumb[];
  companySlug: string;
  extra?: React.ReactNode;
}

export const CompanyCardContent: React.FunctionComponent<
  Props & React.HTMLAttributes<HTMLDivElement>
> = ({ children, breadcrumbs, companySlug, ...rest }) => {
  return (
    <Card
      bordered={false}
      title={
        <Breadcrumb>
          {breadcrumbs.map(route => (
            <Breadcrumb.Item key={route.path}>
              {breadcrumbs.length - 1 === breadcrumbs.indexOf(route) ? (
                <span>{route.title}</span>
              ) : (
                <Link href={`/employer/${companySlug}${route.path}`}>
                  <a>{route.title}</a>
                </Link>
              )}
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
      }
      {...rest}
    >
      {children}
    </Card>
  );
};
