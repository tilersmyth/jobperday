import * as React from 'react';
import { Spin } from 'antd';
import { SpinProps } from 'antd/lib/spin';

import styles from './style.less';

export const LoaderMask: React.SFC<SpinProps> = (props): JSX.Element => (
  <div className={styles.loaderMask}>
    <Spin {...props} />
  </div>
);
