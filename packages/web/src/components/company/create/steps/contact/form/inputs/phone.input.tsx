import React from 'react';
import InputMask, { ReactInputMask } from 'react-input-mask';
import { FieldProps, getIn } from 'formik';
import { Input, Form } from 'antd';

interface FieldPropsExt extends FieldProps {
  label: string;
}

export const CompanyPhoneInput: React.FunctionComponent<FieldPropsExt> = ({
  field,
  form: { errors, touched },
  ...props
}) => {
  const errorMsg = getIn(errors, field.name);
  const error = errorMsg && getIn(touched, field.name);
  const { label, ...inputProps } = props;

  return (
    <Form.Item
      validateStatus={error ? 'error' : undefined}
      help={errorMsg}
      label={label}
    >
      <InputMask mask="(999) 999 9999" {...field} {...inputProps}>
        {(maskProps: ReactInputMask) => <Input {...maskProps} />}
      </InputMask>
    </Form.Item>
  );
};
