import React from 'react';
import { Layout } from 'antd';

import styles from './style.less';

interface Props {
  children: any;
}

export const CompanyContent: React.FunctionComponent<Props> = ({
  children,
}) => <Layout className={styles.container}>{children}</Layout>;
