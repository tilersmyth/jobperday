import React, { ReactNode } from 'react';
import { Layout } from 'antd';

import styles from './style.less';

interface Props {
  children: ReactNode;
}

export const CandidateContent: React.FunctionComponent<Props> = ({
  children,
}) => <Layout className={styles.container}>{children}</Layout>;
