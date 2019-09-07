import { NextPage } from 'next';

import { NextPageContextApollo } from '../types';
import { checkAuth } from '../utils/checkAuth';
import { SearchView } from '../components/search/search-view';
import { MeQuery } from '../apollo/generated-components';

interface Props {
  me: MeQuery['me'] | null;
}

const Search: NextPage<Props> = ({ me }) => <SearchView me={me} />;

Search.getInitialProps = async (ctx: NextPageContextApollo) => {
  const me = await checkAuth(ctx);
  return { me };
};

export default Search;
