import React from 'react';
import { Drawer } from 'antd';

import styles from './style.less';

interface Props {
  children: any;
  visible: boolean;
  close: () => void;
  companyName: string;
}

export const CompanySidebarDrawer: React.FunctionComponent<Props> = ({
  children,
  visible,
  close,
  companyName,
}) => (
  <Drawer
    placement="left"
    closable={true}
    onClose={close}
    visible={visible}
    title={companyName}
    className={styles.container}
  >
    {children}
  </Drawer>
);
