import React from 'react';
import { Form, DatePicker } from 'antd';
import { FieldProps, getIn } from 'formik';

interface Props extends FieldProps {
  label: string;
}

export const DatepickerInput: React.FunctionComponent<Props> = ({
  field,
  form: { errors, touched, setFieldValue },
  label,
  ...inputProps
}) => {
  const errorMsg = getIn(errors, field.name);
  const error = errorMsg && getIn(touched, field.name);

  return (
    <Form.Item
      label={label}
      validateStatus={error ? 'error' : undefined}
      help={errorMsg}
    >
      <DatePicker
        {...inputProps}
        showTime={true}
        onChange={value => value && setFieldValue(field.name, value.format())}
        onOk={value => setFieldValue(field.name, value.format())}
      />
    </Form.Item>
  );
};
