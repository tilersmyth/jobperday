import { NextPage } from 'next';

import { NextPageContextApollo } from '../../../../../types';
import { fetchMe } from '../../../../../utils';
import { MeQuery } from '../../../../../apollo/generated-components';
import { redirect } from '../../../../../apollo/redirect';
import { CompanyAdminLayout } from '../../../../../components/shared';

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
    <CompanyAdminLayout
      pageTitle="Posting"
      pageRole="associate"
      companySlug={slug}
    >
      Single posting view
    </CompanyAdminLayout>
  );
};

JobPosting.getInitialProps = async (ctx: NextPageContextApollo) => {
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
  const postingId = ctx.query['posting-id'] as string;

  return { slug, postingId };
};

export default JobPosting;
