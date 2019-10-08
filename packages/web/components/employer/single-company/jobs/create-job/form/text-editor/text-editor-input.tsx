import React from 'react';
import ReactQuill from 'react-quill';
import { Form } from 'antd';
import 'react-quill/dist/quill.snow.css';
import './style.less';
import { FieldProps, getIn } from 'formik';

export const TextEditorInput: React.FunctionComponent<FieldProps> = ({
  field,
  form: { errors, touched, setFieldValue },
}) => {
  const errorMsg = getIn(errors, field.name);
  const error = errorMsg && getIn(touched, field.name);

  return (
    <Form.Item
      label="Description"
      className="text-editor-input"
      validateStatus={error ? 'error' : undefined}
      help={errorMsg}
    >
      <ReactQuill
        {...field}
        onChange={(value: string) => setFieldValue(field.name, value)}
      />
    </Form.Item>
  );
};
