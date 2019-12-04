import { FieldProps, getIn } from 'formik';
import { Form, Radio } from 'antd';

interface Props extends FieldProps {
  options: string[];
}

export const RadioInput = ({
  field,
  form: { errors, touched, setFieldValue },
  options,
}: Props) => {
  const errorMsg = getIn(errors, field.name);
  const error = errorMsg && getIn(touched, field.name);

  return (
    <Form.Item validateStatus={error ? 'error' : undefined} help={errorMsg}>
      <Radio.Group onChange={e => setFieldValue(field.name, e.target.value)}>
        {options.map(opt => (
          <Radio key={opt} style={{ display: 'block' }} value={opt}>
            {opt}
          </Radio>
        ))}
      </Radio.Group>
    </Form.Item>
  );
};
