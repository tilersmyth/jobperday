import React, { useState, ReactNode } from 'react';
import { useQuery } from 'react-apollo';
import { Affix, Menu } from 'antd';
import { MenuProps } from 'antd/lib/menu';
import cx from 'classnames';

import {
  ViewportQueryDocument,
  ViewportQueryQuery,
} from '../../../../../apollo/generated-components';
import { Breakpoints } from '../../../../../utils';
import styles from './style.less';

interface Props extends MenuProps {
  extra?: ReactNode;
}

export const CompanyPageMenu: React.FunctionComponent<Props> = ({
  extra,
  ...menuProps
}) => {
  const [affix, setAffix] = useState<boolean | undefined>(false);
  const { data } = useQuery<ViewportQueryQuery>(ViewportQueryDocument);

  if (!data) {
    return null;
  }

  return (
    <Affix
      offsetTop={
        Breakpoints[data.viewport] < Breakpoints.XL
          ? parseInt(styles.affixSm, 10)
          : parseInt(styles.affixLg, 10)
      }
      onChange={setAffix}
      className={styles.container}
    >
      <div
        className={cx(styles.inner, {
          [styles.affix]: affix,
        })}
      >
        <Menu className={styles.menu} {...menuProps} />
        {extra && <span className={styles.extra}>{extra}</span>}
      </div>
    </Affix>
  );
};
