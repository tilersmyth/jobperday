import React from 'react';
import { Card, Breadcrumb } from 'antd';
import Link from 'next/link';
import { useQuery } from 'react-apollo';

import { CurrentCompanyDocument } from '../../../../apollo/generated-components';

export interface CompanyBreadcrumb {
  title: string;
  path: string;
}

interface Props {
  children: any;
  breadcrumbs: CompanyBreadcrumb[];
  extra?: React.ReactNode;
}

export const CompanyCardContent: React.FunctionComponent<
  Props & React.HTMLAttributes<HTMLDivElement>
> = ({ children, breadcrumbs, ...rest }) => {
  const {
    data: { currentCompany },
  } = useQuery<any>(CurrentCompanyDocument);

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
                <Link
                  as={`/employer/${currentCompany.slug}${route.path}`}
                  href={`/employer/[company-slug]${route.path}`}
                >
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
