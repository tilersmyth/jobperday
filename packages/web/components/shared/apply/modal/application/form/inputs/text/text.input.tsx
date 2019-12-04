import { FieldProps, getIn } from 'formik';
import { Form, Input } from 'antd';

export const TextInput = ({ field, form: { errors, touched } }: FieldProps) => {
  const errorMsg = getIn(errors, field.name);
  const error = errorMsg && getIn(touched, field.name);

  return (
    <Form.Item validateStatus={error ? 'error' : undefined} help={errorMsg}>
      <Input {...field} />
    </Form.Item>
  );
};
