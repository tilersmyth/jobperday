import React, { useState } from 'react';
import { useQuery } from 'react-apollo';
import { Affix } from 'antd';
import cx from 'classnames';

import {
  ViewportQueryDocument,
  ViewportQueryQuery,
} from '../../../../../../apollo/generated-components';
import { Breakpoints } from '../../../../../../utils';
import styles from './style.less';

interface Props {
  children: any;
}

export const SearchHeaderContainer: React.FunctionComponent<Props> = ({
  children,
}) => {
  const [affix, setAffix] = useState<any>(false);

  const { data } = useQuery<ViewportQueryQuery>(ViewportQueryDocument);

  if (!data) {
    return null;
  }

  return (
    <Affix
      offsetTop={
        Breakpoints[data.viewport] < Breakpoints.XXL
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
        {children}
      </div>
    </Affix>
  );
};
