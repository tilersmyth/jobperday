import React from 'react';
import { useQuery } from 'react-apollo';

import { Step2Form } from './step2-form';
import { STEP2_FORM_VALUES } from './step2-form-values';
import { FindCreateCompanyProfileDocument } from '../../../../../apollo/generated-components';

interface Props {
  companySlug?: string;
  nextStep: (id: string) => void;
  previousStep: () => void;
}

export const Step2: React.FunctionComponent<Props> = props => {
  const { companySlug } = props;

  if (!companySlug) {
    return null;
  }

  const values = STEP2_FORM_VALUES;

  const { data, loading } = useQuery(FindCreateCompanyProfileDocument, {
    variables: { companySlug },
  });

  if (loading) {
    return <div>loading</div>;
  }

  const profile = data.findCreateCompanyProfile;

  const existingValues = Object.assign(values, profile);

  return (
    <Step2Form
      formValues={existingValues}
      {...props}
      companySlug={companySlug}
      profileId={profile && profile.id}
    />
  );
};
