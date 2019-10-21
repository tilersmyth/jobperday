import { NextPage } from 'next';
import Router from 'next/router';

import { NextPageContextApollo } from '../../types';
import { fetchMe } from '../../utils';
import { CandidateView } from '../../components/candidate/candidate-view';
import { MeQuery, SearchInput } from '../../apollo/generated-components';
import { redirect } from '../../apollo/redirect';
import { SearchModel } from '../../utils/search/SearchModel';
import { SearchLocation } from '../../utils/search/search-location.util';

interface Props {
  me: MeQuery['me'] | null;
  searchArgs: SearchInput;
}

const Candidate: NextPage<Props> = ({ me, searchArgs }) => {
  if (!me) {
    return null;
  }
  return <CandidateView me={me} searchArgs={searchArgs} />;
};

Candidate.getInitialProps = async (ctx: NextPageContextApollo) => {
  const me = await fetchMe(ctx);
  const searchArgs = new SearchModel();

  if (!me) {
    if (ctx) {
      redirect(ctx, '/login');
    }
    Router.replace('/login');
    return { me, searchArgs };
  }

  // Load user search loc from session
  if (me.search) {
    searchArgs.location = me.search;
    return { me, searchArgs };
  }

  const search = new SearchLocation(me, ctx);
  const location = await search.set();

  if (location) {
    searchArgs.location = location;
  }

  return { me, searchArgs };
};

export default Candidate;
