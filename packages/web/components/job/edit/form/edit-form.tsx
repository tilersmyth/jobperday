import React from 'react';
import { Form, Row, Col, Alert } from 'antd';
import { FormikProps, Field } from 'formik';

import { EditJobHeader, JobInputCard } from '../layout';
import { UpdateJobInput } from '../../../../apollo';
import {
  JobTitleInput,
  TextEditorInput,
  SelectJobTypeInput,
  JobTagsInput,
  JobCoverImageInput,
  SelectApplicationInput,
  JobSummaryInput,
} from './inputs';
import styles from './style.less';

export const EditJobForm: React.FunctionComponent<FormikProps<
  UpdateJobInput
>> = ({ handleSubmit, values, status }) => (
  <Form onSubmit={handleSubmit}>
    <EditJobHeader formValues={values} status={status} />

    {values.id && !values.defaultApplicationId && (
      <Alert
        style={{ marginTop: 20 }}
        message={`${values.title} needs a default application before it can be posted`}
        type="warning"
        showIcon={true}
      />
    )}

    <Row gutter={24} className={styles.container}>
      <Col md={{ span: 15 }}>
        <div className={styles.textEditor}>
          <Field
            name="title"
            placeholder="Enter Job Title"
            component={JobTitleInput}
          />
          <Field name="description" component={TextEditorInput} />
        </div>
        <JobInputCard title="Job Summary">
          <Field name="summary" component={JobSummaryInput} />
        </JobInputCard>
      </Col>
      <Col md={{ span: 9 }}>
        <JobInputCard title="Job Type">
          <Field name="type" component={SelectJobTypeInput} />
        </JobInputCard>
        <JobInputCard
          title="Tags"
          hint="Tags help the search functionality populate relevant jobs"
        >
          <Field name="tags" component={JobTagsInput} />
        </JobInputCard>

        <Field name="default_image" component={JobCoverImageInput} />

        <JobInputCard title="Default Application">
          <Field
            name="defaultApplicationId"
            component={SelectApplicationInput}
          />
        </JobInputCard>
      </Col>
    </Row>
  </Form>
);
