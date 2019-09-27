import { FieldProps, getIn } from 'formik';
import { Form, Input } from 'antd';

interface FieldPropsExt extends FieldProps {
  label: string;
}

export const InputField = ({
  field,
  form: { errors, touched },
  ...props
}: FieldPropsExt) => {
  const errorMsg = getIn(errors, field.name);
  const error = errorMsg && getIn(touched, field.name);
  const { label, ...rest } = props;

  return (
    <Form.Item validateStatus={error ? 'error' : undefined} help={errorMsg}>
      <Input {...field} {...rest} />
    </Form.Item>
  );
};
