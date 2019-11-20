import { FieldProps } from 'formik';
import { Form, Input } from 'antd';

import './style.less';

export const JobTitleInput = ({ field, form, ...inputProps }: FieldProps) => {
  return (
    <Form.Item className="edit-job-title-input">
      <Input autoComplete="off" {...field} {...inputProps} />
    </Form.Item>
  );
};
