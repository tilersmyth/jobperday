import { NextPage } from 'next';

import { NextPageContextApollo } from '../../../types';
import { fetchMe } from '../../../utils';
import { redirect } from '../../../apollo/redirect';
import { CompanyAdminLayout } from '../../../components/shared';

interface Props {
  slug?: string;
}

const EmployerCompany: NextPage<Props> = ({ slug }) => {
  if (!slug) {
    return null;
  }

  return (
    <CompanyAdminLayout
      pageTitle="Home"
      pageRole="associate"
      companySlug={slug}
    >
      <div>Home Page</div>
    </CompanyAdminLayout>
  );
};

EmployerCompany.getInitialProps = async (ctx: NextPageContextApollo) => {
  const me = await fetchMe(ctx);

  if (!me) {
    redirect(ctx, '/login');
    return {};
  }

  if (me.realm !== 'employer') {
    redirect(ctx, '/candidate');
    return {};
  }

  const slug = ctx.query['company-slug'] as string;

  return { slug };
};

export default EmployerCompany;
