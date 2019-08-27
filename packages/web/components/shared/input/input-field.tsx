import { FieldProps } from 'formik';
import { Form, Input } from 'antd';

interface FieldPropsExt extends FieldProps {
  label: string;
}

export const InputField = ({
  field,
  form: { errors, touched },
  ...props
}: FieldPropsExt) => {
  const errorMessage = touched[field.name] && errors[field.name];
  const { label, ...rest } = props;
  return (
    <Form.Item
      validateStatus={errorMessage ? 'error' : undefined}
      help={errorMessage}
    >
      <Input {...field} {...rest} />
    </Form.Item>
  );
};
