import React from 'react';
import { useQuery } from 'react-apollo';

import { CreateCompanyLayout } from '../../shared';
import { CompanySetupFormView } from './form/form-view';
import { FindCompanyDocument, FindCompanyQuery } from '../../../../../apollo';
import { SETUP_INITIAL_VALUES } from './form/initial-values';

interface Props {
  companySlug?: string;
  step: number;
}

export const CreateCompanySetupView: React.FunctionComponent<Props> = ({
  companySlug,
  step,
}) => {
  // Create new company
  if (!companySlug) {
    return (
      <CreateCompanyLayout
        loading={false}
        step={step}
        form={<CompanySetupFormView data={SETUP_INITIAL_VALUES} step={step} />}
        helper={<div>this is helper</div>}
      />
    );
  }

  // Update company
  const { loading, error, data } = useQuery<FindCompanyQuery>(
    FindCompanyDocument,
    {
      variables: { companySlug },
    },
  );

  if (error || !data) {
    return <div>Error loading data</div>;
  }

  return (
    <CreateCompanyLayout
      loading={loading}
      step={step}
      form={<CompanySetupFormView data={data.findCompany} step={step} />}
      helper={<div>this is helper</div>}
    />
  );
};
