import React from 'react';
import dynamic from 'next/dynamic';
import { FieldProps } from 'formik';
import { Form } from 'antd';
import 'react-quill/dist/quill.snow.css';

import { LoaderMask } from '../../../../../shared';
import styles from './style.less';

const ReactQuill = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => (
    <div className={styles.loader}>
      <LoaderMask />
    </div>
  ),
});

export const TextEditorInput: React.FunctionComponent<FieldProps> = ({
  field,
  form: { setFieldValue },
}) => {
  return (
    <Form.Item>
      <ReactQuill
        {...field}
        className={styles.quill}
        onChange={(value: string) => setFieldValue(field.name, value)}
      />
    </Form.Item>
  );
};
