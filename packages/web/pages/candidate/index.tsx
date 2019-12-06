import { NextPage } from 'next';
import Router from 'next/router';

import { NextPageContextApollo } from '../../types';
import { fetchMe } from '../../utils';
import { SearchInput } from '../../apollo/generated-components';
import { redirect } from '../../apollo/redirect';
import { SearchModel } from '../../utils/search/SearchModel';
import { SearchLocation } from '../../utils/search/search-location.util';
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
  const searchArgs = new SearchModel();

  if (!me) {
    if (ctx) {
      redirect(ctx, '/login');
    }
    Router.replace('/login');
    return {};
  }

  // Load user search loc from session
  if (me.location) {
    searchArgs.location = me.location;
    return { searchArgs };
  }

  const search = new SearchLocation(me, ctx);
  const location = await search.set();

  if (location) {
    searchArgs.location = location;
  }

  return { me, searchArgs };
};

export default Candidate;
