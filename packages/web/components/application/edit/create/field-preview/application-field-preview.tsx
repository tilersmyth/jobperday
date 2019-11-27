import React from 'react';
import { Typography } from 'antd';

import { ApplicationFieldInput } from '../../../../../apollo/generated-components';
import styles from './style.less';
import { FieldInputType } from './inputs';

interface Props {
  index: number;
  field: ApplicationFieldInput;
}

export const ApplicationFieldPreview: React.FunctionComponent<Props> = ({
  index,
  field,
}) => (
  <div className={styles.container}>
    <Typography className={styles.text}>
      {index + 1}. {field.question}
    </Typography>
    <FieldInputType type={field.type} options={field.options} />
  </div>
);
