import React from 'react';
import { Form, Switch } from 'antd';
import { FieldProps } from 'formik';

export const RequiredSwitchInput: React.FunctionComponent<FieldProps> = ({
  field,
  form: { setFieldValue },
}) => {
  return (
    <Form.Item label={`${field.value ? 'Required' : 'Optional'} Field`}>
      <Switch
        defaultChecked={field.value}
        onChange={value => setFieldValue(field.name, value)}
      />
    </Form.Item>
  );
};
