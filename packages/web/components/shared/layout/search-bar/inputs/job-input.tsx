import { FieldProps } from 'formik';
import { Form, Input, Icon } from 'antd';

interface FieldPropsExt extends FieldProps {
  onFocus: () => void;
}

export const SearchJobInput = ({
  field,
  form: { errors, touched },
  ...props
}: FieldPropsExt) => {
  const errorMessage = touched[field.name] && errors[field.name];
  const { onFocus } = props;
  return (
    <Form.Item validateStatus={errorMessage ? 'error' : undefined}>
      <Input
        {...field}
        prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
        placeholder="Job title or keyword"
        size="large"
        onFocus={onFocus}
      />
    </Form.Item>
  );
};
