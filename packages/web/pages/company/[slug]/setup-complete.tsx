import { NextPage } from 'next';

import { NextPageContextApollo } from '../../../types';
import { fetchMe } from '../../../utils';
import {
  FindCompanyDocument,
  FindCompanyQuery,
} from '../../../apollo/generated-components';
import { redirect } from '../../../apollo/redirect';
import { SetupCompleteView } from '../../../components/company/create-company/complete/setup-complete-view';

interface Props {
  company?: FindCompanyQuery['findCompany'] | null;
}

const CompanySetupComplete: NextPage<Props> = ({ company }) => {
  if (!company) {
    return null;
  }

  return <SetupCompleteView company={company} />;
};

CompanySetupComplete.getInitialProps = async (ctx: NextPageContextApollo) => {
  const me = await fetchMe(ctx);

  if (!me) {
    redirect(ctx, '/login');
    return {};
  }

  const { data } = await ctx.apolloClient.query({
    query: FindCompanyDocument,
    variables: { companySlug: ctx.query.slug },
  });

  if (!data.findCompany) {
    redirect(ctx, '/company/create');
    return { me, company: null };
  }

  const company = data.findCompany;

  return { me, company };
};

export default CompanySetupComplete;
