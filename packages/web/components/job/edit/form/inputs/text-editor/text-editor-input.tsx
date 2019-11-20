import React from 'react';
import dynamic from 'next/dynamic';
import { FieldProps } from 'formik';
import { Form } from 'antd';
import 'react-quill/dist/quill.snow.css';

import { LoaderMask } from '../../../../../shared';
import './style.less';

const ReactQuill = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => (
    <div className="quill-loader-container">
      <LoaderMask />
    </div>
  ),
});

export const TextEditorInput: React.FunctionComponent<FieldProps> = ({
  field,
  form: { setFieldValue },
}) => {
  return (
    <Form.Item className="edit-job-text-editor">
      <ReactQuill
        {...field}
        onChange={(value: string) => setFieldValue(field.name, value)}
      />
    </Form.Item>
  );
};
