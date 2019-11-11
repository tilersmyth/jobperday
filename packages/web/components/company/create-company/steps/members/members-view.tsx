import React from 'react';

import { CreateCompanyLayout } from '../../shared';
import { CompanyMembersFormView } from './form/form-view';

interface Props {
  companySlug?: string;
  step: number;
}

export const CreateCompanyMembersView: React.FunctionComponent<Props> = ({
  step,
}) => {
  return (
    <CreateCompanyLayout
      loading={false}
      step={step}
      form={<CompanyMembersFormView step={step} />}
      helper={<div>this is helper</div>}
    />
  );
};
