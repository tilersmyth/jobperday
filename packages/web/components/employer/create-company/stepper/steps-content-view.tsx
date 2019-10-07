import React from 'react';
import Router from 'next/router';
import { createCompanySteps } from '@jobperday/common';

import { Step1 } from './steps/step1/step1';
import { Step2 } from './steps/step2/step2';
import { Step3 } from './steps/step3/step3';

interface Props {
  companySlug?: string;
  step: number;
}

export const CreateCompanyStepsContent: React.FunctionComponent<Props> = ({
  step,
  companySlug,
}) => {
  const nextStep = (slug: string) => {
    ++step;

    if (step < createCompanySteps.length) {
      Router.push(
        '/company/create/[slug]/[step]',
        `/company/create/${slug}/${step}`,
      );
      return;
    }

    Router.push(
      '/company/[slug]/setup-complete',
      `/company/${slug}/setup-complete`,
    );
  };

  const previousStep = () => {
    if (!companySlug) {
      return;
    }

    --step;

    if (step === 0) {
      Router.push('/company/create/[slug]', `/company/create/${companySlug}`);
      return;
    }

    Router.push(
      '/company/create/[slug]/[step]',
      `/company/create/${companySlug}/${step}`,
    );
  };

  return (
    <React.Fragment>
      {step === 0 && <Step1 companySlug={companySlug} nextStep={nextStep} />}

      {step === 1 && (
        <Step2
          companySlug={companySlug}
          nextStep={nextStep}
          previousStep={previousStep}
        />
      )}

      {step === 2 && (
        <Step3
          companySlug={companySlug}
          nextStep={nextStep}
          previousStep={previousStep}
        />
      )}
    </React.Fragment>
  );
};
