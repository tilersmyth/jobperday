import { FieldProps } from 'formik';
import { Form, Input } from 'antd';

import styles from './style.less';

export const JobTitleInput = ({ field, form, ...inputProps }: FieldProps) => {
  return (
    <Form.Item className={styles.container}>
      <Input autoComplete="off" {...field} {...inputProps} />
    </Form.Item>
  );
};
