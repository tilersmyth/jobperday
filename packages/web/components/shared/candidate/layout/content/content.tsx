import React from 'react';
import { Layout } from 'antd';

import './style.less';

interface Props {
  children: any;
}

export const CandidateContent: React.FunctionComponent<Props> = ({
  children,
}) => <Layout className="candidate-content">{children}</Layout>;
