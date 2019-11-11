import { NextPage } from 'next';
import { createCompanySteps } from '@jobperday/common';

import { NextPageContextApollo } from '../../../../types';
import { fetchMe } from '../../../../utils';
import { redirect } from '../../../../apollo/redirect';
import { FindCompanyDocument, FindCompanyQuery } from '../../../../apollo';
import { CreateCompanyCompleteView } from '../../../../components/company/create-company/steps/complete';

interface Props {
  company?: FindCompanyQuery['findCompany'];
}

const CreateCompanyComplete: NextPage<Props> = ({ company }) => {
  if (!company) {
    return null;
  }

  return <CreateCompanyCompleteView company={company} />;
};

CreateCompanyComplete.getInitialProps = async (ctx: NextPageContextApollo) => {
  const me = await fetchMe(ctx);

  if (!me) {
    redirect(ctx, '/login');
    return {};
  }

  const companySlug = ctx.query.slug as string;

  const { data } = await ctx.apolloClient.query<FindCompanyQuery>({
    query: FindCompanyDocument,
    variables: { companySlug },
  });

  if (!data) {
    redirect(ctx, '/company/create');
    return {};
  }

  const { findCompany } = data;

  // Check if company is fully setup
  if (!findCompany.setup_complete) {
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

  return { company: findCompany };
};

export default CreateCompanyComplete;
