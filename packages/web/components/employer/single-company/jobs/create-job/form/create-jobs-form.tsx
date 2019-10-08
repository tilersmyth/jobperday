import React from 'react';
import dynamic from 'next/dynamic';
import { Button, Form, Row, Col } from 'antd';
import { Field, FormikProps } from 'formik';

import { InputField } from '../../../../../shared/input/input-field';
import { SelectJobTypeField } from './select-type-field';
import { TextAreaField } from '../../../../../shared/input/textarea-field';
import { SelectTagsField } from './select-tags-field';

const TextEditorInput = dynamic(
  async () => {
    const file = await import('./text-editor/text-editor-input');
    return file.TextEditorInput;
  },
  { ssr: false },
);

export const CompanyCreateJobsForm: React.FunctionComponent<
  FormikProps<{}>
> = ({ handleSubmit }) => {
  return (
    <Form layout="vertical" onSubmit={handleSubmit}>
      <Row gutter={16}>
        <Col lg={{ span: 12 }}>
          <Field
            label="Title"
            name="name"
            size="large"
            placeholder="Title"
            component={InputField}
          />
        </Col>
        <Col lg={{ span: 12 }}>
          <Field name="type" component={SelectJobTypeField} />
        </Col>
      </Row>
      <Field
        label="Summary"
        name="summary"
        size="large"
        placeholder="Summary"
        component={TextAreaField}
      />

      <Field name="description" component={TextEditorInput} />

      <Field name="keywords" component={SelectTagsField} />

      <Button type="primary" htmlType="submit" size="large" block={true}>
        Submit
      </Button>
    </Form>
  );
};
