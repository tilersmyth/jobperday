import { NextPage } from 'next';

import { NextPageContextApollo } from '../../../../types';
import { fetchMe } from '../../../../utils';
import {
  MeQuery,
  FindCompanyDocument,
} from '../../../../apollo/generated-components';
import { redirect } from '../../../../apollo/redirect';
import { CreateCompanyView } from '../../../../components/company/create-company/stepper/create-company-view';

interface Props {
  me: MeQuery['me'] | null;
  step: number;
  companySlug: string | null;
}

const CreateCompanySteps: NextPage<Props> = ({ me, companySlug, step }) => {
  if (!me || !companySlug) {
    return null;
  }

  return <CreateCompanyView companySlug={companySlug} step={step} />;
};

CreateCompanySteps.getInitialProps = async (ctx: NextPageContextApollo) => {
  const me = await fetchMe(ctx);

  if (!me) {
    redirect(ctx, '/login');
    return { me, companySlug: null, step: -1 };
  }

  const { data } = await ctx.apolloClient.query({
    query: FindCompanyDocument,
    variables: { companySlug: ctx.query.slug },
  });

  if (!data.findCompany) {
    redirect(ctx, '/company/create');
    return { me, companySlug: null, step: -1 };
  }

  const company = data.findCompany;
  const step = Number(ctx.query.step);

  // Company setup_stage must be greater than current step
  if (company.setup_stage < step) {
    redirect(ctx, `/company/create/${company.slug}/${company.setup_stage}`);
    return { me, companySlug: null, step: -1 };
  }

  return { me, companySlug: company.slug, step };
};

export default CreateCompanySteps;
