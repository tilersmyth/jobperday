import { NextPage } from 'next';

import { NextPageContextApollo } from '../../../../../types';
import { fetchMe } from '../../../../../utils';
import { redirect } from '../../../../../apollo/redirect';
import { UpdateJobView } from '../../../../../components/job';
import { CompanyAdminLayout } from '../../../../../components/shared';

interface Props {
  companySlug?: string;
  jobId?: string;
}

const EmployerCompanyCreateJobs: NextPage<Props> = ({ companySlug, jobId }) => {
  if (!companySlug || !jobId) {
    return null;
  }

  return (
    <CompanyAdminLayout
      pageTitle="Edit Job"
      pageRole="associate"
      companySlug={companySlug}
    >
      <UpdateJobView companySlug={companySlug} jobId={jobId} />
    </CompanyAdminLayout>
  );
};

EmployerCompanyCreateJobs.getInitialProps = async (
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

  const companySlug = ctx.query['company-slug'] as string;
  const jobId = ctx.query['job-id'] as string;

  return { companySlug, jobId };
};

export default EmployerCompanyCreateJobs;
