import * as React from 'react';
import { Layout, Menu } from 'antd';
import { useQuery } from 'react-apollo';

import {
  CurrentUserDocument,
  CurrentUserQuery,
} from '../../../../../apollo/generated-components';
import { Icon } from '../../../icon';
import styles from './style.less';

interface Props {
  openDrawer?: (value: boolean) => void;
}

export const CompanyHeader: React.SFC<Props> = ({ openDrawer }) => {
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
    <Layout.Header className={styles.container}>
      <div className={styles.brand}>
        {openDrawer && (
          <div className={styles.menuIcon}>
            <Icon type="menu-line" onClick={() => openDrawer(true)} />
          </div>
        )}
        <div className={styles.placeholder} />
      </div>
      <Menu theme="dark" mode="horizontal" className={styles.menu}>
        <Menu.SubMenu title={currentUser.first_name} className={styles.subMenu}>
          <Menu.ItemGroup
            title={currentUser.email}
            className={styles.itemGroup}
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
