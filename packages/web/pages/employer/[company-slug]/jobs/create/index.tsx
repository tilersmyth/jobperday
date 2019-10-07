import { NextPage } from 'next';

import { NextPageContextApollo } from '../../../../../types';
import { checkAuth } from '../../../../../utils/checkAuth';
import { MeQuery } from '../../../../../apollo/generated-components';
import { redirect } from '../../../../../apollo/redirect';
import { CompanyLayout } from '../../../../../components/employer/single-company/shared/layout/company-layout';
import { CompanyCreateJobsView } from '../../../../../components/employer/single-company/jobs/create-job/create-jobs-view';

interface Props {
  me?: MeQuery['me'];
  slug?: string;
}

const EmployerCompanyCreateJobs: NextPage<Props> = ({ me, slug }) => {
  if (!me || !slug) {
    return null;
  }

  return (
    <CompanyLayout
      pageTitle=""
      companySlug={slug}
      pageRole="associate"
      header={{ subTitle: 'Jobs' }}
    >
      {() => <CompanyCreateJobsView companySlug={slug} />}
    </CompanyLayout>
  );
};

EmployerCompanyCreateJobs.getInitialProps = async (
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

export default EmployerCompanyCreateJobs;
