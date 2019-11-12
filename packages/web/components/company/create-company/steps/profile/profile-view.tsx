import React from 'react';
import { useQuery } from 'react-apollo';

import { CreateCompanyLayout } from '../../shared';
import {
  FindCompanyProfileQuery,
  FindCompanyProfileDocument,
} from '../../../../../apollo';
import { PROFILE_INITIAL_VALUES, CompanyProfileFormView } from './form';

interface Props {
  companySlug?: string;
  step: number;
}

export const CreateCompanyProfileView: React.FunctionComponent<Props> = ({
  companySlug,
  step,
}) => {
  const { loading, error, data } = useQuery<FindCompanyProfileQuery>(
    FindCompanyProfileDocument,
    {
      variables: { companySlug },
    },
  );

  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <CreateCompanyLayout
      formLoading={loading}
      step={step}
      form={
        <CompanyProfileFormView
          data={(data && data.findCompanyProfile) || PROFILE_INITIAL_VALUES}
          step={step}
        />
      }
      helper={<div>this is helper</div>}
    />
  );
};
