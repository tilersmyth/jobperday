import { NextPage } from 'next';

import { NextPageContextApollo } from '../../../../types';
import { fetchMe } from '../../../../utils';
import { redirect } from '../../../../apollo/redirect';
import { CreateCompanySetupView } from '../../../../components/company';

interface Props {
  companySlug?: string;
}

const CreateCompanySetup: NextPage<Props> = ({ companySlug }) => {
  if (!companySlug) {
    return null;
  }

  return <CreateCompanySetupView step={0} companySlug={companySlug} />;
};

CreateCompanySetup.getInitialProps = async (ctx: NextPageContextApollo) => {
  const me = await fetchMe(ctx);

  if (!me) {
    redirect(ctx, '/login');
    return {};
  }

  const companySlug = ctx.query.slug as string;

  return { companySlug };
};

export default CreateCompanySetup;
