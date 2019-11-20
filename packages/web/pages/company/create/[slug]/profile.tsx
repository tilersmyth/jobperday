import { NextPage } from 'next';
import { createCompanySteps } from '@jobperday/common';

import { NextPageContextApollo } from '../../../../types';
import { fetchMe } from '../../../../utils';
import { redirect } from '../../../../apollo/redirect';
import { FindCompanyDocument, FindCompanyQuery } from '../../../../apollo';
import { CreateCompanyProfileView } from '../../../../components/company';

interface Props {
  companySlug?: string;
  step?: number;
}

const CreateCompanyProfile: NextPage<Props> = ({ companySlug, step }) => {
  if (!companySlug || !step) {
    return null;
  }

  return <CreateCompanyProfileView step={step} companySlug={companySlug} />;
};

CreateCompanyProfile.getInitialProps = async (ctx: NextPageContextApollo) => {
  const me = await fetchMe(ctx);

  if (!me) {
    redirect(ctx, '/login');
    return {};
  }

  const companySlug = ctx.query.slug as string;

  const companySetup = createCompanySteps.find(
    setup => setup.title.toLowerCase() === 'profile',
  );

  const { data } = await ctx.apolloClient.query<FindCompanyQuery>({
    query: FindCompanyDocument,
    variables: { companySlug },
  });

  if (!data || !companySetup) {
    redirect(ctx, '/company/create');
    return {};
  }

  const { findCompany } = data;

  // Check if authorized for current step
  if (findCompany.setup_stage < companySetup.step) {
    // Redirect to last authorized step

    const lastAuth = createCompanySteps.find(
      setup => setup.step === findCompany.setup_stage,
    );

    if (!lastAuth) {
      redirect(ctx, '/company/create');
      return {};
    }

    redirect(
      ctx,
      `/company/create/${findCompany.slug}/${lastAuth.title.toLowerCase()}`,
    );
    return {};
  }

  return { companySlug, step: companySetup.step };
};

export default CreateCompanyProfile;
