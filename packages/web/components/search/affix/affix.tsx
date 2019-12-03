import React, { useState } from 'react';
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
  const [affixed, setAffixed] = useState<boolean | undefined>(false);
  const { data } = useQuery<ViewportQueryQuery>(ViewportQueryDocument);

  if (!data) {
    return null;
  }

  return (
    <Affix
      onChange={setAffixed}
      offsetTop={
        Breakpoints[data.viewport] < Breakpoints.XXL
          ? parseInt(styles.affixSm, 10)
          : parseInt(styles.affixLg, 10)
      }
      {...htmlProps}
    >
      <div
        style={{
          height: `calc(100vh - ${
            affixed ? styles.affixLg : styles.affixScroll
          }px)`,
        }}
      >
        {children}
      </div>
    </Affix>
  );
};
