import React from 'react';
import { Tooltip, Icon } from 'antd';

interface Props {
  hint: string;
}

export const JobInputHint: React.FunctionComponent<Props> = ({ hint }) => (
  <Tooltip title={hint}>
    <Icon type="question-circle" />
  </Tooltip>
);
