import { FieldProps, getIn } from 'formik';
import { Form, Checkbox } from 'antd';

interface Props extends FieldProps {
  options: string[];
}

export const CheckboxInput = ({
  field,
  form: { errors, touched, setFieldValue },
  options,
}: Props) => {
  const errorMsg = getIn(errors, field.name);
  const error = errorMsg && getIn(touched, field.name);

  return (
    <Form.Item validateStatus={error ? 'error' : undefined} help={errorMsg}>
      {options.map(opt => {
        return (
          <Checkbox
            key={opt}
            style={{ display: 'block', marginLeft: 8 }}
            value={opt}
            checked={field.value.includes(opt)}
            onChange={({ target }) => {
              const index = field.value.indexOf(target.value);

              if (index > -1) {
                field.value.splice(index, 1);
                setFieldValue(field.name, field.value);
                return;
              }

              setFieldValue(field.name, [...field.value, target.value]);
            }}
          >
            {opt}
          </Checkbox>
        );
      })}
    </Form.Item>
  );
};
