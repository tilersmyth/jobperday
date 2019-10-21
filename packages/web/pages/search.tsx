import { NextPage } from 'next';

import { NextPageContextApollo } from '../types';
import { fetchMe } from '../utils';
import { SearchView } from '../components/search/search-view';
import { MeQuery, SearchInput } from '../apollo/generated-components';
import { SearchLocation } from '../utils/search/search-location.util';
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
  const me = await fetchMe(ctx);

  const { query } = ctx;

  if (!query.location) {
    console.log('this will eventually be a redirect');
    return { me };
  }

  const search = new SearchLocation(me, ctx);
  const location = await search.find(query.location);

  // Result of invalid location param in query
  if (!location) {
    console.log('this will eventually be a redirect');
    return { me };
  }

  const searchArgs = queryToSearch(query, location);

  return { me, searchArgs };
};

export default Search;
