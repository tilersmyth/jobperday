import { NextPage } from 'next';

import { NextPageContextApollo } from '../../../../types';
import { fetchMe } from '../../../../utils';
import { MeQuery } from '../../../../apollo/generated-components';
import { redirect } from '../../../../apollo/redirect';
import { CompanyAdminLayout } from '../../../../components/shared';
import { ApplicationsListView } from '../../../../components/application';

interface Props {
  me?: MeQuery['me'];
  slug?: string;
}

const CompanyApplicationsPage: NextPage<Props> = ({ me, slug }) => {
  if (!me || !slug) {
    return null;
  }

  return (
    <CompanyAdminLayout
      pageTitle="Applications"
      pageRole="manager"
      companySlug={slug}
    >
      <ApplicationsListView />
    </CompanyAdminLayout>
  );
};

CompanyApplicationsPage.getInitialProps = async (
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

  return { me, slug };
};

export default CompanyApplicationsPage;
