import { NextPage } from 'next';

import { NextPageContextApollo } from '../../../types';
import { checkAuth } from '../../../utils/checkAuth';
import { MeQuery } from '../../../apollo/generated-components';
import { redirect } from '../../../apollo/redirect';
import { CreateCompanyView } from '../../../components/company/create/create-company-view';

interface Props {
  me: MeQuery['me'] | null;
}

const CreateCompany: NextPage<Props> = ({ me }) => {
  if (!me) {
    return null;
  }

  return <CreateCompanyView step={0} />;
};

CreateCompany.getInitialProps = async (ctx: NextPageContextApollo) => {
  const me = await checkAuth(ctx);

  if (!me) {
    redirect(ctx, '/login');
    return { me };
  }

  return { me };
};

export default CreateCompany;
