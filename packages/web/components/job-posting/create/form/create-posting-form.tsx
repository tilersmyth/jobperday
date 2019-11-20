import React from 'react';
import { FormikProps, Field, FormikValues } from 'formik';
import { Form, Row, Col } from 'antd';

import { FindAllJobsQuery } from '../../../../apollo/generated-components';
import {
  SelectJobInput,
  SelectAddressView,
  PayRateInput,
  OpeningsInput,
  DatepickerInput,
  ActiveSwitch,
  SelectApplicationInput,
} from './inputs';
import './style.less';

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
    <Form
      layout="vertical"
      onSubmit={handleSubmit}
      className="job_posting_form"
    >
      <Field name="posting.active" size="large" component={ActiveSwitch} />
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
          <SelectAddressView companySlug={companySlug} />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col lg={{ span: 16 }}>
          <Field
            name="posting.pay_rate"
            size="large"
            placeholder="Pay rate"
            component={PayRateInput}
          />
        </Col>
        <Col lg={{ span: 8 }}>
          <Field
            name="posting.total_openings"
            size="large"
            placeholder="Openings"
            component={OpeningsInput}
          />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col lg={{ span: 8 }}>
          <Field
            name="posting.start_date"
            size="large"
            label="Start time"
            placeholder="Start time"
            component={DatepickerInput}
          />
        </Col>
        <Col lg={{ span: 8 }}>
          <Field
            name="posting.end_date"
            size="large"
            label="End time"
            placeholder="End time"
            component={DatepickerInput}
          />
        </Col>
        <Col lg={{ span: 8 }}>
          <Field
            name="posting.apply_deadline"
            size="large"
            label="Deadline to apply"
            placeholder="Deadline to apply"
            component={DatepickerInput}
          />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col lg={{ span: 12 }}>
          <Field
            name="applicationId"
            size="large"
            placeholder="Select application"
            companySlug={companySlug}
            component={SelectApplicationInput}
          />
        </Col>
      </Row>
    </Form>
  );
};
