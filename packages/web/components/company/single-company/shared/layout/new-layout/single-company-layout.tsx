import React, { useState } from 'react';
import { Layout } from 'antd';
import Router from 'next/router';
import { isMemberAuth, MemberRoles } from '@jobperday/common';
import ReactResizeDetector from 'react-resize-detector';

import { FindEmployerCompanyComponent } from '../../../../../../apollo/generated-components';

import { CompanyNavbar } from '../navbar/navbar';
import { CompanySidebarDrawer } from '../drawer';
import { CompanySidebarMenu } from '../sidebar-menu';
import { CompanySidebar } from '../sidebar/sidebar';
import { CompanyLayout } from '../../../../shared/layout/company-layout/company-layout';
import { ContentLoader } from '../../../../shared';

import './style.less';

const { Content } = Layout;

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
  children: any;
  header?: HeaderProps;
}

export const SingleCompanyLayout: React.FunctionComponent<Props> = ({
  pageTitle,
  companySlug,
  pageRole,
  children,
}) => {
  const [useDrawer, setUseDrawer] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [title, setTitle] = useState('Loading company');

  const onWidthResize = (width: number) => {
    if (useDrawer && width >= 992) {
      setDrawerOpen(false);
      setUseDrawer(false);
    }

    if (!useDrawer && width < 1200) {
      setUseDrawer(true);
    }
  };

  return (
    <React.Fragment>
      <CompanyLayout title={title}>
        <FindEmployerCompanyComponent variables={{ companySlug }}>
          {({ error, loading, data }) => {
            if (loading) {
              return <ContentLoader tip="Loading company" />;
            }

            if (error || !data) {
              setTitle('Error');
              return <div>error</div>;
            }

            const company = data.findEmployerCompany;

            setTitle(`${company.name} » ${pageTitle}`);

            if (!isMemberAuth(pageRole, company.member.role)) {
              Router.push(
                '/employer/[company-slug]',
                `/employer/${companySlug}`,
              );
              return null;
            }

            return (
              <React.Fragment>
                <CompanyNavbar openDrawer={setDrawerOpen} />
                <CompanySidebar>
                  <CompanySidebarMenu companySlug={companySlug} />
                </CompanySidebar>
                <Layout className="content">
                  <Content>{children}</Content>
                </Layout>
                <CompanySidebarDrawer
                  close={() => setDrawerOpen(false)}
                  visible={drawerOpen}
                  companyName={company.name}
                >
                  <CompanySidebarMenu companySlug={companySlug} />
                </CompanySidebarDrawer>
              </React.Fragment>
            );
          }}
        </FindEmployerCompanyComponent>
      </CompanyLayout>
      <ReactResizeDetector handleWidth={true} onResize={onWidthResize} />
    </React.Fragment>
  );
};
