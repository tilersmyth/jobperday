import React, { useState } from 'react';
import { useQuery } from 'react-apollo';
import { Affix } from 'antd';

import {
  ViewportQueryDocument,
  ViewportQueryQuery,
} from '../../../../../../apollo/generated-components';
import { Breakpoints } from '../../../../../../utils';
import './style.less';

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
      offsetTop={Breakpoints[data.viewport] < Breakpoints.XL ? 54 : 64}
      onChange={setAffix}
      className="search-header"
    >
      <div className={`header-inner ${affix ? 'affix' : ''}`}>{children}</div>
    </Affix>
  );
};
