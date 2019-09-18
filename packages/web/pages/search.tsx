import { NextPage } from 'next';

import { NextPageContextApollo } from '../types';
import { checkAuth } from '../utils/checkAuth';
import { SearchView } from '../components/search/search-view';
import { MeQuery, SearchInput } from '../apollo/generated-components';
import { setSearchLocation } from '../utils/set-search-location.util';
import { queryToSearch } from '../utils/search/search-query-map';

interface Props {
  me: MeQuery['me'] | null;
  searchArgs?: SearchInput;
}

const Search: NextPage<Props> = ({ me, searchArgs }) => {
  if (!searchArgs) {
    return null;
  }

  return <SearchView me={me} searchArgs={searchArgs} />;
};

Search.getInitialProps = async (ctx: NextPageContextApollo) => {
  const me = await checkAuth(ctx);

  const { query } = ctx;

  if (!query.location) {
    console.log('this will eventually be a redirect');
    return { me };
  }

  // Validates location as well as stores in cookie
  const location = await setSearchLocation(me, ctx);

  if (!location) {
    console.log('this will eventually be a redirect');
    return { me };
  }

  const searchArgs = queryToSearch(query, location);

  return { me, searchArgs };
};

export default Search;
