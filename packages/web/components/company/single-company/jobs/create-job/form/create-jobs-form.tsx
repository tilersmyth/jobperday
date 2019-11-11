import React from 'react';
import dynamic from 'next/dynamic';
import { Button, Form } from 'antd';
import { Field, FormikProps } from 'formik';

import { InputField } from '../../../../../shared/input/input-field';
import { SelectJobTypeField } from './select-type-field';
import { TextAreaField } from '../../../../../shared/input/textarea-field';
import { SelectTagsField } from './select-tags-field';
// import { ImageUploadModal } from '../../../../../shared';

const TextEditorInput = dynamic(
  async () => {
    const file = await import('./text-editor/text-editor-input');
    return file.TextEditorInput;
  },
  { ssr: false },
);

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
    xl: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
    xl: { span: 20 },
  },
};

export const CompanyCreateJobsForm: React.FunctionComponent<
  FormikProps<{}>
> = ({ handleSubmit }) => {
  // const [imageModal, setImageModal] = useState(false);

  return (
    <Form {...formItemLayout} layout="horizontal" onSubmit={handleSubmit}>
      {/* <Button onClick={() => setImageModal(true)}>Add Image</Button> */}

      <Field
        label="Title"
        name="name"
        size="large"
        placeholder="Title"
        component={InputField}
      />

      <Field name="type" component={SelectJobTypeField} />

      <Field
        label="Summary"
        name="summary"
        size="large"
        placeholder="Summary"
        component={TextAreaField}
      />

      <Field name="description" component={TextEditorInput} />

      <Field name="tags" component={SelectTagsField} />

      <Button type="primary" htmlType="submit" size="large" block={true}>
        Submit
      </Button>

      {/* <ImageUploadModal
        multiple={false}
        visible={imageModal}
        onOk={() => setImageModal(false)}
        onCancel={() => setImageModal(false)}
        onSelect={files => {
          console.log('SELECTED', files);
          setImageModal(false);
        }}
      /> */}
    </Form>
  );
};
