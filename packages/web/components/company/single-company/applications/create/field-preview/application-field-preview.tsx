import React from 'react';
import { Typography } from 'antd';

import { ApplicationFieldInput } from '../../../../../../apollo/generated-components';
import './style.less';
import { FieldInputType } from './inputs';

interface Props {
  index: number;
  field: ApplicationFieldInput;
}

export const ApplicationFieldPreview: React.FunctionComponent<Props> = ({
  index,
  field,
}) => (
  <div className="field-preview-inner">
    <Typography className="question-text">
      {index + 1}. {field.question}
    </Typography>
    <FieldInputType type={field.type} options={field.options} />
  </div>
);
