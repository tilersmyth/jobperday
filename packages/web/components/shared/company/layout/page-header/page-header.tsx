import React, { useState } from 'react';
import { useQuery } from 'react-apollo';
import { PageHeader, Affix } from 'antd';
import { PageHeaderProps } from 'antd/lib/page-header';

import {
  ViewportQueryDocument,
  ViewportQueryQuery,
} from '../../../../../apollo/generated-components';
import { Breakpoints } from '../../../../../utils';
import './style.less';

export const CompanyPageHeader: React.FunctionComponent<PageHeaderProps> = props => {
  const [affix, setAffix] = useState<boolean | undefined>(false);
  const { data } = useQuery<ViewportQueryQuery>(ViewportQueryDocument);

  if (!data) {
    return null;
  }

  return (
    <Affix
      offsetTop={Breakpoints[data.viewport] < Breakpoints.XL ? 54 : 64}
      onChange={setAffix}
      className="company-page-header"
    >
      <div className={`header-inner ${affix ? 'affix' : ''}`}>
        <PageHeader {...props} />
      </div>
    </Affix>
  );
};
