import * as React from 'react';
import Link from 'next/link';
import { Menu } from 'antd';

import { CurrentUserQuery } from '../../../../../../apollo/generated-components';
import styles from './style.less';

interface Props {
  user: CurrentUserQuery['currentUser'];
  logout: () => void;
}

export const CandidateHeaderMenu: React.SFC<Props> = ({ user, logout }) => {
  if (!user) {
    return (
      <Menu theme="dark" mode="horizontal" className={styles.menu}>
        <Menu.Item className={styles.menuRight}>
          <Link href="/login" as="/login">
            <a>Login</a>
          </Link>
        </Menu.Item>
      </Menu>
    );
  }

  return (
    <Menu theme="dark" mode="horizontal" className={styles.menu}>
      <Menu.SubMenu title={user.first_name} className={styles.menuRight}>
        <Menu.ItemGroup title={user.email} className={styles.itemgroup}>
          <Menu.Item key="setting:1">Account</Menu.Item>
          <Menu.Item key="setting:2" onClick={logout}>
            Logout
          </Menu.Item>
        </Menu.ItemGroup>
      </Menu.SubMenu>
    </Menu>
  );
};
