import React from 'react';
import { Form } from 'antd';
import { Field, FormikProps } from 'formik';

import { CreateCompanyStepsActions } from '../../../shared';
import { TextAreaField } from '../../../../../shared/input/textarea-field';
import { SelectCoverImage, SelectProfileImage } from './inputs';
import styles from './style.less';

interface Props extends FormikProps<{}> {
  step: number;
}

export const CompanyProfileForm: React.FunctionComponent<Props> = ({
  handleSubmit,
  step,
}) => {
  return (
    <Form onSubmit={handleSubmit} colon={false}>
      <div className="ant-form-item-label">
        <label className="ant-form-item-no-colon">
          Profile and Cover Image (click to update)
        </label>
      </div>
      <div className={styles.container}>
        <Field name="cover_image" component={SelectCoverImage} />
        <Field name="profile_image" component={SelectProfileImage} />
      </div>

      <Field
        label="Company Overview"
        name="about"
        placeholder="Brief description"
        autoSize={{ minRows: 4, maxRows: 8 }}
        component={TextAreaField}
      />

      <CreateCompanyStepsActions step={step} />
    </Form>
  );
};
