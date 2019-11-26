import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import Router from 'next/router';
import { isMemberAuth, MemberRoles } from '@jobperday/common';
import { useQuery } from 'react-apollo';

import {
  FindCompanyComponent,
  ViewportQueryDocument,
  ViewportQueryQuery,
} from '../../../../../apollo/generated-components';
import { RootLayout } from '../../../layout';
import { CompanyHeader } from '../header';
import { CompanySidebarDrawer } from './drawer';
import { CompanySidebarMenu } from './sidebar-menu';
import { CompanySider } from './sider';
import { CompanyContent } from '../content';
import { Breakpoints } from '../../../../../utils';

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

export const CompanyAdminLayout: React.FunctionComponent<Props> = ({
  pageTitle,
  companySlug,
  pageRole,
  children,
}) => {
  const { data: uiData } = useQuery<ViewportQueryQuery>(ViewportQueryDocument);

  if (!uiData) {
    return null;
  }

  const [useDrawer, setUseDrawer] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [title, setTitle] = useState('Loading company');

  useEffect(() => {
    const smallScreen = Breakpoints[uiData.viewport] < Breakpoints.XL;

    if (useDrawer && !smallScreen) {
      setDrawerOpen(false);
      setUseDrawer(false);
    }

    if (!useDrawer && smallScreen) {
      setUseDrawer(true);
    }
  }, [uiData.viewport]);

  return (
    <RootLayout title={title}>
      <CompanyHeader openDrawer={setDrawerOpen} />
      <FindCompanyComponent variables={{ companySlug }}>
        {({ error, loading, data }) => {
          if (loading) {
            return <div>loading...</div>;
          }

          if (error || !data) {
            setTitle('Error');
            return <div>error</div>;
          }

          const company = data.findCompany;

          setTitle(`${company.name} » ${pageTitle}`);

          if (!isMemberAuth(pageRole, company.members[0].role)) {
            Router.push('/employer/[company-slug]', `/employer/${companySlug}`);
            return null;
          }

          return (
            <CompanyContent>
              <CompanySider company={company}>
                <CompanySidebarMenu companySlug={companySlug} />
              </CompanySider>
              <Layout className="company-admin-content">
                <Content>{children}</Content>
              </Layout>
              <CompanySidebarDrawer
                close={() => setDrawerOpen(false)}
                visible={drawerOpen}
                companyName={company.name}
              >
                <CompanySidebarMenu companySlug={companySlug} />
              </CompanySidebarDrawer>
            </CompanyContent>
          );
        }}
      </FindCompanyComponent>
    </RootLayout>
  );
};
