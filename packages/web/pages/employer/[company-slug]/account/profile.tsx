import { NextPage } from 'next';

import { NextPageContextApollo } from '../../../../types';
import { checkAuth } from '../../../../utils/checkAuth';
import { MeQuery } from '../../../../apollo/generated-components';
import { redirect } from '../../../../apollo/redirect';
import { CompanyLayout } from '../../../../components/employer/single-company/shared/layout/company-layout';

interface Props {
  me?: MeQuery['me'];
  slug?: string;
}

const EmployerCompanyAccountProfile: NextPage<Props> = ({ me, slug }) => {
  if (!me || !slug) {
    return null;
  }

  return (
    <CompanyLayout
      pageTitle="Profile"
      companySlug={slug}
      pageRole="manager"
      header={{ subTitle: 'Profile' }}
    >
      {() => <div>Account Profile Page</div>}
    </CompanyLayout>
  );
};

EmployerCompanyAccountProfile.getInitialProps = async (
  ctx: NextPageContextApollo,
) => {
  const me = await checkAuth(ctx);

  if (!me) {
    redirect(ctx, '/login');
    return {};
  }

  if (me.realm !== 'employer') {
    redirect(ctx, '/candidate');
    return {};
  }

  const slug = ctx.query['company-slug'] as string;

  return { me, slug };
};

export default EmployerCompanyAccountProfile;
