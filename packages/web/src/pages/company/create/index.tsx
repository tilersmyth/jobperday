import { NextPage } from 'next';

import { NextPageContextApollo } from '../../../../types';
import { fetchMe } from '../../../utils';
import { MeQuery } from '../../../apollo/generated-components';
import { redirect } from '../../../apollo/redirect';
import { CreateCompanySetupView } from '../../../components/company';

interface Props {
  me: MeQuery['me'] | null;
}

const CreateCompany: NextPage<Props> = ({ me }) => {
  if (!me) {
    return null;
  }

  return <CreateCompanySetupView step={0} />;
};

CreateCompany.getInitialProps = async (ctx: NextPageContextApollo) => {
  const me = await fetchMe(ctx);

  if (!me) {
    redirect(ctx, '/login');
    return { me };
  }

  return { me };
};

export default CreateCompany;
