import * as React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { useQuery } from 'react-apollo';

import {
  CurrentUserDocument,
  CurrentUserQuery,
} from '../../../../../apollo/generated-components';
import styles from './style.less';

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
    <Layout.Header className={styles.headerContainer}>
      <div className={styles.headerBrand}>
        {openDrawer && (
          <div className={styles.menuIcon}>
            <Icon type="menu" onClick={() => openDrawer(true)} />
          </div>
        )}
        <div className={styles.brandPlaceholder} />
      </div>
      <Menu theme="dark" mode="horizontal" className={styles.headerMenu}>
        <Menu.SubMenu
          title={currentUser.first_name}
          className={styles.headerSubMenu}
        >
          <Menu.ItemGroup
            title={currentUser.email}
            className={styles.headerMenuGroup}
          >
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
