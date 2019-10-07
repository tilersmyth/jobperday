import { NextPage } from 'next';

import { NextPageContextApollo } from '../../../../types';
import { checkAuth } from '../../../../utils/checkAuth';
import {
  MeQuery,
  FindCompanyDocument,
} from '../../../../apollo/generated-components';
import { redirect } from '../../../../apollo/redirect';
import { CreateCompanyView } from '../../../../components/employer/create-company/stepper/create-company-view';

interface Props {
  me: MeQuery['me'] | null;
  companySlug: string | null;
}

const CreateCompany: NextPage<Props> = ({ me, companySlug }) => {
  if (!me || !companySlug) {
    return null;
  }

  return <CreateCompanyView step={0} companySlug={companySlug} />;
};

CreateCompany.getInitialProps = async (ctx: NextPageContextApollo) => {
  const me = await checkAuth(ctx);

  if (!me) {
    redirect(ctx, '/login');
    return { me, companySlug: null };
  }

  const { data } = await ctx.apolloClient.query({
    query: FindCompanyDocument,
    variables: { companySlug: ctx.query.slug },
  });

  if (!data.findCompany) {
    redirect(ctx, '/company/create');
    return { me, companySlug: null };
  }

  const company = data.findCompany;

  return { me, companySlug: company.slug };
};

export default CreateCompany;
