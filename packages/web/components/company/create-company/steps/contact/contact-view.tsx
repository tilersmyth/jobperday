import React from 'react';
import { useQuery } from 'react-apollo';

import { CreateCompanyLayout } from '../../shared';
import { CompanyContactFormView, CONTACT_INITIAL_VALUES } from './form';
import {
  FindCompanyContactDocument,
  FindCompanyContactQuery,
} from '../../../../../apollo';

interface Props {
  companySlug: string;
  step: number;
}

export const CreateCompanyContactView: React.FunctionComponent<Props> = ({
  step,
  companySlug,
}) => {
  const { loading, error, data } = useQuery<FindCompanyContactQuery>(
    FindCompanyContactDocument,
    {
      variables: { companySlug },
    },
  );

  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <CreateCompanyLayout
      loading={loading}
      step={step}
      form={
        <CompanyContactFormView
          data={(data && data.findCompanyContact) || CONTACT_INITIAL_VALUES}
          step={step}
        />
      }
      helper={<div>this is helper</div>}
    />
  );
};
