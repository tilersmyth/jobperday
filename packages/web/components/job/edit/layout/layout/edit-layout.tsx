import React from 'react';

import styles from './style.less';
import { LoaderMask } from '../../../../shared';

interface Props {
  loading: boolean;
  children: any;
}

export const EditJobLayout: React.FunctionComponent<Props> = ({
  loading,
  children,
}) => {
  return (
    <div className={styles.container}>
      {loading && <LoaderMask />}
      {children}
    </div>
  );
};
