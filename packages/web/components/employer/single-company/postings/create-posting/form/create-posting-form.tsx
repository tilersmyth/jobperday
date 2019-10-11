import React from 'react';
import { FormikProps, Field, FormikValues } from 'formik';
import { Form, Row, Col } from 'antd';

import { FindAllJobsQuery } from '../../../../../../apollo/generated-components';
import { SelectJobInput } from './inputs';

interface Props extends FormikProps<FormikValues> {
  companySlug: string;
  jobs: FindAllJobsQuery['findAllJobs'];
}

export const CreatePostingForm: React.FunctionComponent<Props> = ({
  handleSubmit,
  companySlug,
  jobs,
}) => {
  return (
    <Form layout="vertical" onSubmit={handleSubmit}>
      <Row gutter={16}>
        <Col lg={{ span: 12 }}>
          <Field
            name="jobId"
            size="large"
            placeholder="Select a job"
            companySlug={companySlug}
            jobs={jobs}
            component={SelectJobInput}
          />
        </Col>
        <Col lg={{ span: 12 }}>
          <div>Address placeholder</div>
        </Col>
      </Row>
      <br />
      <br />
      <br />
      <br />
    </Form>
  );
};
