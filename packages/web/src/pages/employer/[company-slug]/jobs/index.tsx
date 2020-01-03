import { NextPage } from 'next';

import { NextPageContextApollo } from '../../../../../types';
import { fetchMe } from '../../../../utils';
import { MeQuery } from '../../../../apollo/generated-components';
import { redirect } from '../../../../apollo/redirect';
import { CompanyAdminLayout } from '../../../../components/shared';
import { JobsListView } from '../../../../components/job';

interface Props {
  me?: MeQuery['me'];
  slug?: string;
}

const EmployerCompanyJobs: NextPage<Props> = ({ me, slug }) => {
  if (!me || !slug) {
    return null;
  }

  return (
    <CompanyAdminLayout
      pageTitle="Jobs"
      pageRole="associate"
      companySlug={slug}
    >
      <JobsListView />
    </CompanyAdminLayout>
  );
};

EmployerCompanyJobs.getInitialProps = async (ctx: NextPageContextApollo) => {
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

export default EmployerCompanyJobs;
