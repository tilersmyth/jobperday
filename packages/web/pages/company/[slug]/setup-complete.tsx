import { NextPage } from 'next';

import { NextPageContextApollo } from '../../../types';
import { checkAuth } from '../../../utils/checkAuth';
import {
  MeQuery,
  FindCompanyDocument,
  FindCompanyQuery,
} from '../../../apollo/generated-components';
import { redirect } from '../../../apollo/redirect';
import { SetupCompleteView } from '../../../components/company/setup-complete-view';

interface Props {
  me: MeQuery['me'] | null;
  company: FindCompanyQuery['findCompany'] | null;
}

const CompanySetupComplete: NextPage<Props> = ({ me, company }) => {
  if (!me || !company) {
    return null;
  }

  return <SetupCompleteView company={company} />;
};

CompanySetupComplete.getInitialProps = async (ctx: NextPageContextApollo) => {
  const me = await checkAuth(ctx);

  if (!me) {
    redirect(ctx, '/login');
    return { me, company: null };
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
