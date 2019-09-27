import React from 'react';

import { CompanyLayout } from '../company-layout';
import { CreateCompanyStepsHeader } from './steps-header-view';
import { CreateCompanyStepsHelper } from './steps-helper-view';
import { CreateCompanyStepsContent } from './steps-content-view';

interface Props {
  step: number;
  companySlug?: string;
}

export const CreateCompanyView: React.FunctionComponent<Props> = ({
  step,
  companySlug,
}) => {
  return (
    <CompanyLayout
      header={<CreateCompanyStepsHeader step={step} />}
      helper={<CreateCompanyStepsHelper step={step} />}
      content={
        <CreateCompanyStepsContent step={step} companySlug={companySlug} />
      }
    />
  );
};
