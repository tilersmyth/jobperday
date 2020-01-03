import React from 'react';
import cx from 'classnames';

import { IIconType } from './icon.type';
import styles from './style.less';

interface Props {
  type: IIconType;
  spin?: boolean;
}

const localSvg = '/icons/remixicon/remixicon.symbol.svg';

export const Icon: React.FunctionComponent<Props &
  React.HTMLAttributes<HTMLDivElement>> = ({
  type,
  spin,
  className,
  ...htmlProps
}) => {
  return (
    <i
      className={cx(styles.icon, 'anticon', spin ? styles.spin : '', className)}
      {...htmlProps}
    >
      <svg width="1em" height="1em" fill="currentColor" focusable="false">
        <use xlinkHref={`${localSvg}#${type}`} />
      </svg>
    </i>
  );
};
