import React, { useRef } from 'react';
import { Button } from 'antd';
import Router from 'next/router';
import { Formik } from 'formik';

import { Step1 } from './steps/step1/step1';

interface Props {
  companySlug?: string;
  step: number;
}

export const CreateCompanyStepsContent: React.FunctionComponent<Props> = ({
  step,
  companySlug,
}) => {
  const formRef = useRef<Formik>(null);

  const Submit = async () => {
    if (formRef.current) {
      await formRef.current.submitForm();
    }
  };

  const nextStep = (slug: string) => {
    ++step;

    Router.push(
      '/company/create/[slug]/[step]',
      `/company/create/${slug}/${step}`,
    );
  };

  const LastStep = () => {
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
    <div>
      {step === 0 && (
        <Step1
          formRef={formRef}
          nextStep={nextStep}
          companySlug={companySlug}
        />
      )}

      <Button size="large" type="primary" onClick={Submit}>
        {step < 2 ? 'Next' : 'Done'}
      </Button>

      {step > 0 && (
        <Button size="large" onClick={LastStep}>
          Previous
        </Button>
      )}
    </div>
  );
};
