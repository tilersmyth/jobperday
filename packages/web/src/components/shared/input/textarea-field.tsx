import { FieldProps, getIn } from 'formik';
import { Form, Input } from 'antd';
import { AutoSizeType } from 'antd/lib/input/ResizableTextArea';

const { TextArea } = Input;

interface FieldPropsExt extends FieldProps {
  autoSize?: boolean | AutoSizeType;
  label: string;
}

export const TextAreaField = ({
  field,
  form: { errors, touched },
  autoSize,
  ...props
}: FieldPropsExt) => {
  const errorMsg = getIn(errors, field.name);
  const error = errorMsg && getIn(touched, field.name);
  const { label, ...rest } = props;
  return (
    <Form.Item
      validateStatus={error ? 'error' : undefined}
      help={errorMsg}
      label={label}
    >
      <TextArea {...field} {...rest} autoSize={autoSize} />
    </Form.Item>
  );
};
