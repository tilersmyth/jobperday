import React from 'react';
import { Switch, Typography } from 'antd';
import { FieldProps } from 'formik';

import styles from './style.less';

export const ActiveSwitch: React.FunctionComponent<FieldProps> = ({
  field,
  form: { setFieldValue },
  ...inputProps
}) => (
  <div className={styles.container}>
    <Typography className={styles.text}>
      {field.value ? 'Active' : 'Not Active'}
    </Typography>
    <Switch
      {...inputProps}
      defaultChecked={field.value}
      onChange={value => setFieldValue(field.name, value)}
    />
  </div>
);
