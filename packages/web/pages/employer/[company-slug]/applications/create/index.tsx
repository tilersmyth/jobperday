import { NextPage } from 'next';

import { NextPageContextApollo } from '../../../../../types';
import { fetchMe } from '../../../../../utils';
import { redirect } from '../../../../../apollo/redirect';
import { CompanyAdminLayout } from '../../../../../components/shared';
import { CreateApplicationView } from '../../../../../components/application';

interface Props {
  slug?: string;
}

const CompanyCreateApplicationsPage: NextPage<Props> = ({ slug }) => {
  if (!slug) {
    return null;
  }

  return (
    <CompanyAdminLayout
      pageTitle="Create Application"
      pageRole="manager"
      companySlug={slug}
    >
      <CreateApplicationView companySlug={slug} />
    </CompanyAdminLayout>
  );
};

CompanyCreateApplicationsPage.getInitialProps = async (
  ctx: NextPageContextApollo,
) => {
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

export default CompanyCreateApplicationsPage;
