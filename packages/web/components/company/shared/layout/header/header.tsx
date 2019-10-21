import * as React from 'react';
import { Layout, Menu } from 'antd';
import { useQuery } from 'react-apollo';

import { MeDocument } from '../../../../../apollo/generated-components';

import './style.less';
import { CompanyContainer } from '../company-container';

export const CompanyHeader: React.SFC = (): JSX.Element => {
  const {
    data: { me },
  } = useQuery<any>(MeDocument);

  const handleLogout = async () => {
    console.log('logoout');
  };

  return (
    <Layout.Header className="company-header">
      <CompanyContainer>
        <div className="brand-placeholder" />
        <Menu theme="dark" mode="horizontal" className="header-menu">
          <Menu.SubMenu
            title={
              <span className="submenu-title-wrapper">{me.first_name}</span>
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
      </CompanyContainer>
    </Layout.Header>
  );
};
