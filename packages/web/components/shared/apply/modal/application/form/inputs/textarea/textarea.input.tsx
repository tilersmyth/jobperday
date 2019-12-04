import { FieldProps, getIn } from 'formik';
import { Form, Input } from 'antd';

const { TextArea } = Input;

export const TextareaInput = ({
  field,
  form: { errors, touched },
}: FieldProps) => {
  const errorMsg = getIn(errors, field.name);
  const error = errorMsg && getIn(touched, field.name);

  return (
    <Form.Item validateStatus={error ? 'error' : undefined} help={errorMsg}>
      <TextArea {...field} />
    </Form.Item>
  );
};
