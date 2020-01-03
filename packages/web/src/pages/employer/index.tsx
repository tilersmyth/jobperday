import { NextPage } from 'next';

import { NextPageContextApollo } from '../../../types';
import { fetchMe } from '../../utils';
import { MeQuery } from '../../apollo/generated-components';
import { redirect } from '../../apollo/redirect';
import { CompanyListView } from '../../components/company';

interface Props {
  me?: MeQuery['me'];
}

const Employer: NextPage<Props> = ({ me }) => {
  if (!me) {
    return null;
  }

  return <CompanyListView />;
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
