import React from 'react';
import { Typography } from 'antd';

import styles from './style.less';

export const SearchNoResults: React.FunctionComponent = () => {
  return (
    <div className={styles.container}>
      <Typography.Title level={2}>No jobs found</Typography.Title>
    </div>
  );
};
