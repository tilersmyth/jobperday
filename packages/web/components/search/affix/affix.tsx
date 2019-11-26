import React from 'react';
import { Affix } from 'antd';
import { useQuery } from 'react-apollo';
import { AffixProps } from 'antd/lib/affix';

import {
  ViewportQueryQuery,
  ViewportQueryDocument,
} from '../../../apollo/generated-components';
import { Breakpoints } from '../../../utils';

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

  // smOffset = header-menu height + (layout-gutter-xs*2 + ant-input-lg) + layout-gutter-sm
  // lgOffset = header-menu height + (layout-gutter-xs*2 + ant-input-lg) + layout-gutter-md
  return (
    <Affix
      offsetTop={Breakpoints[data.viewport] < Breakpoints.XL ? 136 : 144}
      {...htmlProps}
    >
      {children}
    </Affix>
  );
};
