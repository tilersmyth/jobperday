import React, { useState } from 'react';
import { useQuery } from 'react-apollo';
import { PageHeader, Affix } from 'antd';
import { PageHeaderProps } from 'antd/lib/page-header';

import { ViewportTypeQueryDocument } from '../../../../../apollo/generated-components';
import './style.less';

export const CompanyPageHeader: React.FunctionComponent<PageHeaderProps> = props => {
  const [affix, setAffix] = useState<any>(false);

  const {
    data: { viewportType },
  } = useQuery<any>(ViewportTypeQueryDocument);
  return (
    <Affix
      offsetTop={viewportType === 'mobile' ? 54 : 64}
      onChange={setAffix}
      className="company-page-header"
    >
      <div className={`header-inner ${affix ? 'affix' : ''}`}>
        <PageHeader {...props} />
      </div>
    </Affix>
  );
};
