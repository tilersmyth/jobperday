import { NextPage } from 'next';
import Router from 'next/router';

import { NextPageContextApollo } from '../../../types';
import { fetchMe, SearchModel } from '../../utils';
import {
  SearchInput,
  GetNonSearchLocationQuery,
  GetNonSearchLocationDocument,
} from '../../apollo/generated-components';
import { redirect } from '../../apollo/redirect';
import { CandidateHomeView } from '../../components/candidate';

interface Props {
  searchArgs?: SearchInput;
}

const Candidate: NextPage<Props> = ({ searchArgs }) => {
  if (!searchArgs) {
    return null;
  }

  return <CandidateHomeView searchArgs={searchArgs} />;
};

Candidate.getInitialProps = async (ctx: NextPageContextApollo) => {
  const me = await fetchMe(ctx);

  if (!me) {
    if (ctx) {
      redirect(ctx, '/login');
    }
    Router.replace('/login');
    return {};
  }

  const searchArgs: SearchInput = new SearchModel();

  const {
    data: { getNonSearchLocation },
  } = await ctx.apolloClient.query<GetNonSearchLocationQuery>({
    query: GetNonSearchLocationDocument,
    context: { nextCtx: ctx },
  });

  if (getNonSearchLocation) {
    searchArgs.location = getNonSearchLocation;
  }

  return { me, searchArgs };
};

export default Candidate;
