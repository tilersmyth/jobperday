import * as React from 'react';
import { Layout, Menu } from 'antd';
import Router from 'next/router';
import Link from 'next/link';

import {
  LogoutDocument,
  MeComponent,
  MeDocument,
} from '../../../../apollo/generated-components';
import { ResponsiveWrapper } from '../../layout/responsive-wrapper';
import './style.less';

export const Header: React.SFC = (): JSX.Element => (
  <React.Fragment>
    <Layout.Header className="jpd-header">
      <ResponsiveWrapper>
        <div className="brand-placeholder" />
        <MeComponent>
          {({ data, client, loading }) => {
            if (loading) {
              return <span>Loading...</span>;
            }

            const me = data && data.me;

            const handleLogout = async () => {
              await client.mutate({
                mutation: LogoutDocument,
                update(cache) {
                  if (data) {
                    cache.writeQuery({
                      query: MeDocument,
                      data: { me: null },
                    });
                  }
                },
              });

              Router.push('/login');
            };

            return me ? (
              <Menu theme="dark" mode="horizontal" className="header-menu">
                <Menu.SubMenu
                  title={
                    <span className="submenu-title-wrapper">
                      {me.first_name}
                    </span>
                  }
                  className="right-menu"
                >
                  <Menu.ItemGroup title={me.email}>
                    <Menu.Item key="setting:1">Account</Menu.Item>
                    <Menu.Item key="setting:2" onClick={handleLogout}>
                      Logout
                    </Menu.Item>
                  </Menu.ItemGroup>
                </Menu.SubMenu>
              </Menu>
            ) : (
              <Menu theme="dark" mode="horizontal" className="header-menu">
                <Menu.Item className="right-menu">
                  <Link href="/login">
                    <a>Login</a>
                  </Link>
                </Menu.Item>
              </Menu>
            );
          }}
        </MeComponent>
      </ResponsiveWrapper>
    </Layout.Header>
  </React.Fragment>
);
