import React from 'react';
import { Form } from 'antd';
import { Field, FormikProps } from 'formik';

import { CreateCompanyStepsActions } from '../../../shared';
import {
  CompanyPhoneInput,
  FormattedAddressInput,
  AddressComponents,
} from './inputs';
import { ContactFormValues, CONTACT_INITIAL_VALUES } from './initial-values';

interface Props extends FormikProps<ContactFormValues> {
  step: number;
}

export const CompanyContactForm: React.FunctionComponent<Props> = ({
  handleSubmit,
  values,
  setFieldValue,
  step,
}) => {
  const changeAddress = () => {
    setFieldValue('formatted_address', '');
    setFieldValue('address', CONTACT_INITIAL_VALUES.address);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Field
        name="phone"
        size="large"
        label="Company Phone"
        placeholder="Phone"
        component={CompanyPhoneInput}
      />

      {// abstract equality operator (==) catches both null and undefined
      values.formatted_address == null ? (
        <AddressComponents change={changeAddress} />
      ) : (
        <Field
          name="formatted_address"
          size="large"
          label="Address"
          placeholder="Start typing..."
          component={FormattedAddressInput}
        />
      )}

      <CreateCompanyStepsActions step={step} />
    </Form>
  );
};
