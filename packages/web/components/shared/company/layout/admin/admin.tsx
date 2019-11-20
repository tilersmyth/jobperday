import React, { useState } from 'react';
import { Layout } from 'antd';
import Router from 'next/router';
import { isMemberAuth, MemberRoles } from '@jobperday/common';
import ReactResizeDetector from 'react-resize-detector';
import { useMutation } from 'react-apollo';

import {
  FindCompanyComponent,
  ViewportTypeMutationDocument,
  ViewportTypeMutationMutation,
} from '../../../../../apollo/generated-components';
import { RootLayout } from '../../../layout';
import { CompanyHeader } from '../header';
import { CompanySidebarDrawer } from './drawer';
import { CompanySidebarMenu } from './sidebar-menu';
import { CompanySider } from './sider';
import { CompanyContent } from '../content';

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
  const [setViewport] = useMutation<ViewportTypeMutationMutation>(
    ViewportTypeMutationDocument,
  );
  const [deviceType, setDeviceType] = useState('');
  const [useDrawer, setUseDrawer] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [title, setTitle] = useState('Loading company');

  const onWidthResize = (width: number) => {
    const mobile = width < 1200;
    const desktop = width >= 992;

    if (useDrawer && desktop) {
      setDrawerOpen(false);
      setUseDrawer(false);
    }

    if (!useDrawer && mobile) {
      setUseDrawer(true);
    }

    if (!deviceType) {
      setDeviceType(mobile ? 'mobile' : 'desktop');
      setViewport({ variables: { type: mobile ? 'mobile' : 'desktop' } });
    }

    if (deviceType === 'mobile' && desktop) {
      setDeviceType('desktop');
      setViewport({ variables: { type: 'desktop' } });
    }

    if (deviceType === 'desktop' && mobile) {
      setDeviceType('mobile');
      setViewport({ variables: { type: 'mobile' } });
    }
  };

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
      <ReactResizeDetector handleWidth={true} onResize={onWidthResize} />
    </RootLayout>
  );
};
