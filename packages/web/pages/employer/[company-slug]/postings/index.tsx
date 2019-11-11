import { NextPage } from 'next';

import { NextPageContextApollo } from '../../../../types';
import { fetchMe } from '../../../../utils';
import { MeQuery } from '../../../../apollo/generated-components';
import { redirect } from '../../../../apollo/redirect';
import { CompanyPostingsView } from '../../../../components/company/single-company/postings/all-postings/company-postings-view';
import { SingleCompanyLayout } from '../../../../components/company/single-company/shared';

interface Props {
  me?: MeQuery['me'];
  slug?: string;
}

const EmployerCompanyPostings: NextPage<Props> = ({ me, slug }) => {
  if (!me || !slug) {
    return null;
  }

  return (
    <SingleCompanyLayout
      pageTitle="Postings"
      pageRole="manager"
      companySlug={slug}
    >
      <CompanyPostingsView />
    </SingleCompanyLayout>
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

  return { me, slug };
};

export default EmployerCompanyPostings;
