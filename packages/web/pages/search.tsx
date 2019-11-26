import { NextPage } from 'next';

import { NextPageContextApollo } from '../types';
import { fetchMe } from '../utils';
import { SearchInput } from '../apollo/generated-components';
import { SearchLocation } from '../utils/search/search-location.util';
import { queryToSearch } from '../utils/search/search-query-map';
import { CandidateSearchView } from '../components/search';

interface Props {
  searchArgs?: SearchInput;
}

const Search: NextPage<Props> = ({ searchArgs }) => {
  if (!searchArgs) {
    return null;
  }

  return <CandidateSearchView searchArgs={searchArgs} />;
};

Search.getInitialProps = async (ctx: NextPageContextApollo) => {
  const me = await fetchMe(ctx);

  const { query } = ctx;

  if (!query.location) {
    console.log('this will eventually be a redirect');
    return {};
  }

  const search = new SearchLocation(me, ctx);
  const location = await search.find(query.location);

  // Result of invalid location param in query
  if (!location) {
    console.log('this will eventually be a redirect');
    return {};
  }

  const searchArgs = queryToSearch(query, location);

  return { searchArgs };
};

export default Search;
