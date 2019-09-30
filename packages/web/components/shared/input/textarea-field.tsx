import { FieldProps, getIn } from 'formik';
import { Form, Input } from 'antd';
import { AutoSizeType } from 'antd/lib/input/TextArea';

const { TextArea } = Input;

interface FieldPropsExt extends FieldProps {
  autosize?: boolean | AutoSizeType;
  label: string;
}

export const TextAreaField = ({
  field,
  form: { errors, touched },
  autosize,
  ...props
}: FieldPropsExt) => {
  const errorMsg = getIn(errors, field.name);
  const error = errorMsg && getIn(touched, field.name);
  const { label, ...rest } = props;

  return (
    <Form.Item validateStatus={error ? 'error' : undefined} help={errorMsg}>
      <TextArea {...field} {...rest} autosize={autosize} />
    </Form.Item>
  );
};
