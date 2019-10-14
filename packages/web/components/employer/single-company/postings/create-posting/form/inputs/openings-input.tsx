import React from 'react';
import { Form, InputNumber } from 'antd';
import { FieldProps, getIn } from 'formik';

export const OpeningsInput: React.FunctionComponent<FieldProps> = ({
  field,
  form: { errors, touched, setFieldValue },
  ...inputProps
}) => {
  const errorMsg = getIn(errors, field.name);
  const error = errorMsg && getIn(touched, field.name);

  return (
    <Form.Item
      label="Openings"
      validateStatus={error ? 'error' : undefined}
      help={errorMsg}
    >
      <InputNumber
        {...inputProps}
        className="ant-input-number"
        min={1}
        max={100}
        defaultValue={field.value}
        onChange={value => setFieldValue(field.name, value)}
      />
    </Form.Item>
  );
};
