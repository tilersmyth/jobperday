import React, { useState } from 'react';
import { Form } from 'antd';
import { Field, FormikProps } from 'formik';

import { InputField } from '../../../../../shared/input/input-field';
import { CreateCompanyStepsActions } from '../../../shared';

import { companySetupSchema } from './validation-schema';
import { SetupFormValues } from './initial-values';
import { CompanySlugInput } from './inputs';

interface Props extends FormikProps<SetupFormValues> {
  step: number;
}

export const CompanySetupForm: React.FunctionComponent<Props> = ({
  handleSubmit,
  values,
  step,
}) => {
  const [initialSlug, setInitialSlug] = useState('');

  const onNameBlur = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (values.slug) {
        return;
      }

      const { name, value } = e.target;
      await companySetupSchema.validateAt(name, values);
      setInitialSlug(value);
    } catch (error) {
      return;
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Field
        name="name"
        size="large"
        label="Company Name"
        placeholder="Name"
        component={InputField}
        onBlur={onNameBlur}
      />

      <Field
        name="slug"
        size="large"
        label="Profile Path"
        placeholder="Path"
        initialValue={initialSlug}
        component={CompanySlugInput}
      />

      <CreateCompanyStepsActions step={step} />
    </Form>
  );
};
