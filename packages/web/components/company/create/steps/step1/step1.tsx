import React from 'react';
import { Formik, FormikValues } from 'formik';
import { useQuery } from 'react-apollo';

import { Step1Form } from './step1-form';
import { STEP1_FORM_VALUES } from './step1-form-values';
import { FindCreateCompanyDocument } from '../../../../../apollo/generated-components';

interface Props {
  companySlug?: string;
  nextStep: (id: string) => void;
  formRef: React.RefObject<Formik<FormikValues>>;
}

export const Step1: React.FunctionComponent<Props> = props => {
  const { companySlug } = props;
  const values = STEP1_FORM_VALUES;

  if (companySlug) {
    const { data, loading } = useQuery(FindCreateCompanyDocument, {
      variables: { input: { companySlug } },
    });

    if (loading) {
      return <div>loading</div>;
    }

    const existingValues = Object.assign({}, data.findCreateCompany, {
      formatted_address: '',
    });

    return (
      <Step1Form formValues={existingValues} ref={props.formRef} {...props} />
    );
  }

  return <Step1Form formValues={values} ref={props.formRef} {...props} />;
};
