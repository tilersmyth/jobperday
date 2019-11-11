import React from 'react';
import { Form } from 'antd';
import { Field, FormikProps } from 'formik';

import { CreateCompanyStepsActions } from '../../../shared';
import { TextAreaField } from '../../../../../shared/input/textarea-field';
import { SelectCoverImage } from './inputs/select-cover-image';

interface Props extends FormikProps<{}> {
  step: number;
}

export const CompanyProfileForm: React.FunctionComponent<Props> = ({
  handleSubmit,
  step,
}) => {
  return (
    <Form onSubmit={handleSubmit} className="company_profile_form_setup">
      <Field name="cover_image" component={SelectCoverImage} />

      <Field
        name="about"
        placeholder="Brief description"
        autoSize={{ minRows: 4, maxRows: 8 }}
        component={TextAreaField}
        className="about_field"
      />

      <CreateCompanyStepsActions step={step} />
    </Form>
  );
};
