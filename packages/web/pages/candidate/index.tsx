import { NextPage } from 'next';
import Router from 'next/router';

import { NextPageContextApollo } from '../../types';
import { checkAuth } from '../../utils/checkAuth';
import { CandidateView } from '../../components/candidate/candidate-view';
import { MeQuery } from '../../apollo/generated-components';
import { redirect } from '../../apollo/redirect';

interface Props {
  me: MeQuery['me'] | null;
}

const Candidate: NextPage<Props> = ({ me }) => {
  if (!me) {
    return null;
  }
  return <CandidateView me={me} />;
};

Candidate.getInitialProps = async (ctx: NextPageContextApollo) => {
  const me = await checkAuth(ctx);

  if (!me) {
    if (ctx) {
      redirect(ctx, '/login');
    }
    Router.replace('/login');
  }

  return { me };
};

export default Candidate;
