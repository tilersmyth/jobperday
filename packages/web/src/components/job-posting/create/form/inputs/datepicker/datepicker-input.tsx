import React from 'react';
import { Form, DatePicker } from 'antd';
import { FieldProps, getIn } from 'formik';

import styles from './style.less';

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
        className={styles.datepicker}
        showTime={true}
        onChange={value => value && setFieldValue(field.name, value.format())}
        onOk={value => value && setFieldValue(field.name, value.format())}
      />
    </Form.Item>
  );
};
