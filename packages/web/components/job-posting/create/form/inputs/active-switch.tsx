import React from 'react';
import { Switch, Typography } from 'antd';
import { FieldProps } from 'formik';

export const ActiveSwitch: React.FunctionComponent<FieldProps> = ({
  field,
  form: { setFieldValue },
  ...inputProps
}) => (
  <div className="active_switch">
    <Typography>{field.value ? 'Active' : 'Not Active'}</Typography>
    <Switch
      {...inputProps}
      defaultChecked={field.value}
      onChange={value => setFieldValue(field.name, value)}
    />
  </div>
);
