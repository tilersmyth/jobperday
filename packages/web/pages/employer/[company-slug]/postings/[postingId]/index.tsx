import { NextPage } from 'next';

import { NextPageContextApollo } from '../../../../../types';
import { checkAuth } from '../../../../../utils/checkAuth';
import { MeQuery } from '../../../../../apollo/generated-components';
import { redirect } from '../../../../../apollo/redirect';
import { CompanyLayout } from '../../../../../components/employer/single-company/shared/layout/company-layout';
import { SinglePostingView } from '../../../../../components/employer/single-company/postings/single-posting/single-posting-view';

interface Props {
  me?: MeQuery['me'];
  slug?: string;
  postingId?: string;
}

const JobPosting: NextPage<Props> = ({ slug, postingId }) => {
  if (!slug || !postingId) {
    return null;
  }

  return (
    <CompanyLayout
      pageTitle=""
      companySlug={slug}
      pageRole="associate"
      header={{ subTitle: 'Postings' }}
    >
      {() => <SinglePostingView companySlug={slug} postingId={postingId} />}
    </CompanyLayout>
  );
};

JobPosting.getInitialProps = async (ctx: NextPageContextApollo) => {
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
  const postingId = ctx.query.postingId as string;

  return { slug, postingId };
};

export default JobPosting;
