import * as React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { useQuery } from 'react-apollo';

import {
  CurrentUserDocument,
  CurrentUserQuery,
} from '../../../../../apollo/generated-components';
import './style.less';

interface Props {
  openDrawer?: (value: boolean) => void;
}

export const CandidateHeader: React.SFC<Props> = ({ openDrawer }) => {
  const { loading, data, error } = useQuery<CurrentUserQuery>(
    CurrentUserDocument,
  );

  if (error || !data || loading) {
    return null;
  }

  const { currentUser } = data;

  const handleLogout = async () => {
    console.log('logoout');
  };

  return (
    <Layout.Header className="candidate-header">
      <div className="candidate-brand">
        {openDrawer && (
          <div className="menu-icon">
            <Icon type="menu" onClick={() => openDrawer(true)} />
          </div>
        )}
        <div className="logo-placeholder" />
      </div>
      <Menu theme="dark" mode="horizontal" className="header-menu">
        <Menu.SubMenu
          title={
            <span className="submenu-title-wrapper">
              {currentUser.first_name}
            </span>
          }
          className="right-menu"
        >
          <Menu.ItemGroup title={currentUser.email}>
            <Menu.Item key="setting:1">Account</Menu.Item>
            <Menu.Item key="setting:2" onClick={handleLogout}>
              Logout
            </Menu.Item>
          </Menu.ItemGroup>
        </Menu.SubMenu>
      </Menu>
    </Layout.Header>
  );
};
