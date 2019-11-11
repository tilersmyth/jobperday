import { NextPage } from 'next';

import { NextPageContextApollo } from '../../../../../types';
import { fetchMe } from '../../../../../utils';
import { MeQuery } from '../../../../../apollo/generated-components';
import { redirect } from '../../../../../apollo/redirect';
import { SingleCompanyLayout } from '../../../../../components/company/single-company/shared';
import { CreateApplicationView } from '../../../../../components/company/single-company/applications';

interface Props {
  me?: MeQuery['me'];
  slug?: string;
}

const CompanyCreateApplicationsPage: NextPage<Props> = ({ me, slug }) => {
  if (!me || !slug) {
    return null;
  }

  return (
    <SingleCompanyLayout
      pageTitle="Applications"
      pageRole="manager"
      companySlug={slug}
    >
      <CreateApplicationView />
    </SingleCompanyLayout>
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

  return { me, slug };
};

export default CompanyCreateApplicationsPage;
