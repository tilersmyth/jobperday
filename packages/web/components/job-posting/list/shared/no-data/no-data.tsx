import React from 'react';

import styles from './style.less';

interface Props {
  children: string;
}

export const PostingsNoData: React.FunctionComponent<Props> = ({
  children,
}) => {
  return <div className={styles.text}>{children}</div>;
};
