import React from 'react';
import { FormikProps, FormikValues, Field } from 'formik';
import { Form, Row, Col } from 'antd';

import {
  SelectApplicationTypeField,
  RequiredSwitchInput,
  AddOptionsInput,
} from '../inputs';
import { TextAreaField } from '../../../../../../shared/input/textarea-field';

const fieldsWithOptions: string[] = ['radio', 'checkbox'];

export const AddApplicatonFieldForm: React.FunctionComponent<
  FormikProps<FormikValues>
> = ({ handleSubmit, values }) => (
  <Form layout="vertical" onSubmit={handleSubmit} className="job_posting_form">
    <Row gutter={32}>
      <Col lg={{ span: 16 }}>
        <Field name="type" component={SelectApplicationTypeField} />
      </Col>
      <Col lg={{ span: 8 }}>
        <Field name="required" component={RequiredSwitchInput} />
      </Col>
    </Row>

    <Field
      label="Question"
      name="question"
      size="large"
      placeholder="What do you want to know about the applicant?"
      component={TextAreaField}
    />

    {fieldsWithOptions.includes(values.type) && (
      <Field name="options" component={AddOptionsInput} />
    )}
  </Form>
);
