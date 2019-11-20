import { NextPage } from 'next';

import { NextPageContextApollo } from '../../../../types';
import { fetchMe } from '../../../../utils';
import { redirect } from '../../../../apollo/redirect';
import { CompanyAdminLayout } from '../../../../components/shared';
import { JobPostingsListView } from '../../../../components/job-posting';

interface Props {
  slug?: string;
}

const EmployerCompanyPostings: NextPage<Props> = ({ slug }) => {
  if (!slug) {
    return null;
  }

  return (
    <CompanyAdminLayout
      pageTitle="Job Postings"
      pageRole="associate"
      companySlug={slug}
    >
      <JobPostingsListView />
    </CompanyAdminLayout>
  );
};

EmployerCompanyPostings.getInitialProps = async (
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

export default EmployerCompanyPostings;
