import React, { ReactNode, useState } from 'react';
import cx from 'classnames';
import { Typography, Divider } from 'antd';

import { Icon } from '../../../../icon';
import styles from './style.less';

interface Props {
  children: ReactNode;
  title: string;
}

export const FilterMenuCollapse: React.FunctionComponent<Props> = ({
  children,
  title,
}) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div>
      <div className={styles.header} onClick={() => setIsActive(!isActive)}>
        <Typography.Title level={4} className={styles.title}>
          {title}
        </Typography.Title>
        <Icon
          className={styles.icon}
          type={isActive ? 'subtract-line' : 'add-line'}
        />
      </div>
      <div
        className={cx(styles.content, {
          [styles.active]: isActive,
        })}
      >
        {children}
      </div>
      <Divider className={styles.divider} />
    </div>
  );
};
