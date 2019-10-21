import React from 'react';
import { Select, Form } from 'antd';
import { FieldProps, getIn } from 'formik';

export const SelectTagsField: React.FunctionComponent<FieldProps> = ({
  field,
  form: { errors, touched, setFieldValue },
}) => {
  const errorMsg = getIn(errors, field.name);
  const error = errorMsg && getIn(touched, field.name);

  return (
    <Form.Item
      label="Tags"
      validateStatus={error ? 'error' : undefined}
      help={errorMsg}
    >
      <Select
        mode="tags"
        onChange={(value: string) => setFieldValue(field.name, value)}
        size="large"
        placeholder="Add tags (optional)"
        showSearch={false}
      />
    </Form.Item>
  );
};
