import React from 'react';
import { Affix } from 'antd';
import { useQuery } from 'react-apollo';
import { AffixProps } from 'antd/lib/affix';

import {
  ViewportQueryQuery,
  ViewportQueryDocument,
} from '../../../apollo/generated-components';
import { Breakpoints } from '../../../utils';

import styles from './style.less';

interface Props extends AffixProps {
  children: JSX.Element;
}

export const SearchAffix: React.FunctionComponent<Props> = ({
  children,
  ...htmlProps
}) => {
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
      {...htmlProps}
    >
      <div style={{ height: `calc(100vh - ${styles.affixLg}px)` }}>
        {children}
      </div>
    </Affix>
  );
};
