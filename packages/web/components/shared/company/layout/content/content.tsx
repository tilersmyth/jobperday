import React from 'react';
import { Layout } from 'antd';

import './style.less';

interface Props {
  children: any;
}

export const CompanyContent: React.FunctionComponent<Props> = ({
  children,
}) => <Layout className="company-content">{children}</Layout>;
