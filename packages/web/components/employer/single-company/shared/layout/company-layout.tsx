import React from 'react';
import { useQuery } from 'react-apollo';
import { Row, Col, PageHeader } from 'antd';
import Link from 'next/link';
import Router from 'next/router';
import { isMemberAuth, MemberRoles } from '@jobperday/common';

import {
  FindEmployerCompanyQuery,
  FindEmployerCompanyDocument,
} from '../../../../../apollo/generated-components';
import { EmployerLayout } from '../../../employer-layout';
import { CompanySingleSidebar } from '../sidebar/single-sidebar';
import './style.less';

interface HeaderProps {
  subTitle?: React.ReactNode;
  extra?: React.ReactNode;
  backIcon?: React.ReactNode;
  onBack?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

interface Props {
  pageTitle: string;
  companySlug: string;
  pageRole: MemberRoles;
  header?: HeaderProps;
  children: (company: FindEmployerCompanyQuery['findEmployerCompany']) => any;
}

export const CompanyLayout: React.FunctionComponent<Props> = ({
  pageTitle,
  companySlug,
  pageRole,
  children,
  header,
}) => {
  const { loading, error, data } = useQuery<FindEmployerCompanyQuery>(
    FindEmployerCompanyDocument,
    {
      variables: { companySlug },
    },
  );

  if (loading) {
    return <div>loading...</div>;
  }

  if (error || !data) {
    return <div>error</div>;
  }

  const { findEmployerCompany } = data;

  if (!isMemberAuth(pageRole, findEmployerCompany.member.role)) {
    Router.push('/employer/[company-slug]', `/employer/${companySlug}`);
    return null;
  }

  return (
    <EmployerLayout
      title={`${findEmployerCompany.name}${pageTitle && ` » ${pageTitle}`}`}
    >
      <PageHeader
        className="company-single-header"
        style={{ marginTop: 20 }}
        title={
          <Link href={`/employer/${companySlug}`}>
            <a>{findEmployerCompany.name}</a>
          </Link>
        }
        {...header}
      />
      <Row gutter={16} style={{ marginTop: 20 }}>
        <Col xs={{ span: 0 }} lg={{ span: 7 }} xl={{ span: 6 }}>
          <CompanySingleSidebar companySlug={companySlug} />
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 17 }} xl={{ span: 18 }}>
          {children(findEmployerCompany)}
        </Col>
      </Row>
    </EmployerLayout>
  );
};
