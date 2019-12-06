import { FieldProps, getIn } from 'formik';
import { Form, Checkbox } from 'antd';

import styles from './style.less';

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
  const fieldValues = field.value ? JSON.parse(field.value) : [];

  return (
    <Form.Item validateStatus={error ? 'error' : undefined} help={errorMsg}>
      {options.map(opt => {
        return (
          <Checkbox
            key={opt}
            className={styles.checkbox}
            value={opt}
            checked={fieldValues.includes(opt)}
            onChange={({ target }) => {
              const index = fieldValues.indexOf(target.value);

              if (index > -1) {
                fieldValues.splice(index, 1);
                setFieldValue(field.name, JSON.stringify(fieldValues));
                return;
              }

              setFieldValue(
                field.name,
                JSON.stringify([...fieldValues, target.value]),
              );
            }}
          >
            {opt}
          </Checkbox>
        );
      })}
    </Form.Item>
  );
};
