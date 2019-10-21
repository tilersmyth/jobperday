import { NextPage } from 'next';

import { NextPageContextApollo } from '../../types';
import { fetchMe } from '../../utils';
import { MeQuery } from '../../apollo/generated-components';
import { redirect } from '../../apollo/redirect';
import { EmployerAllCompaniesView } from '../../components/company/all-companies/employer-dashboard-view';

interface Props {
  me?: MeQuery['me'];
}

const Employer: NextPage<Props> = ({ me }) => {
  if (!me) {
    return null;
  }

  return <EmployerAllCompaniesView />;
};

Employer.getInitialProps = async (ctx: NextPageContextApollo) => {
  const me = await fetchMe(ctx);

  if (!me) {
    redirect(ctx, '/login');
    return {};
  }

  if (me.realm !== 'employer') {
    redirect(ctx, '/candidate');
    return {};
  }

  return { me };
};

export default Employer;
