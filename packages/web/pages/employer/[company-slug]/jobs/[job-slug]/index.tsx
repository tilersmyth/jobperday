import { NextPage } from 'next';

import { NextPageContextApollo } from '../../../../../types';
import { fetchMe } from '../../../../../utils';
import { MeQuery } from '../../../../../apollo/generated-components';
import { redirect } from '../../../../../apollo/redirect';
import { SingleJobView } from '../../../../../components/company/single-company/jobs/single-job/single-job-view';
import { SingleCompanyLayout } from '../../../../../components/company/single-company/shared';

interface Props {
  me?: MeQuery['me'];
  slug?: string;
  jobSlug?: string;
}

const JobSingle: NextPage<Props> = ({ slug, jobSlug }) => {
  if (!slug || !jobSlug) {
    return null;
  }

  return (
    <SingleCompanyLayout
      pageTitle="Job"
      pageRole="associate"
      companySlug={slug}
    >
      <SingleJobView jobSlug={jobSlug} />
    </SingleCompanyLayout>
  );
};

JobSingle.getInitialProps = async (ctx: NextPageContextApollo) => {
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
  const jobSlug = ctx.query['job-slug'] as string;

  return { slug, jobSlug };
};

export default JobSingle;
