import React, { useState } from 'react';
import Router from 'next/router';

import {
  MeQuery,
  SearchInput,
  SearchComponent,
} from '../../apollo/generated-components';
import { SearchSidebar } from './search-sidebar/search-sidebar';
import './style.less';
import { SearchLayout } from './search-layout';
import { SearchBar } from '../shared/layout/search-bar/search-bar';
import { SearchResults } from './search-results';
import { searchToQuery } from '../../utils/search/search-query-map';

interface Props {
  me: MeQuery['me'] | null;
  searchArgs: SearchInput;
}

export const SearchView: React.FunctionComponent<Props> = ({ searchArgs }) => {
  const [args, setArgs] = useState(searchArgs);
  const [search, setSearch] = useState<any>([]);
  const [hasMore, setHasMore] = useState(true);

  return (
    <SearchComponent
      variables={{ input: args }}
      fetchPolicy="cache-and-network"
    >
      {client => {
        const refetch = async (updatedArgs: SearchInput) => {
          const query = searchToQuery(updatedArgs);

          // Add variables to url
          await Router.push({
            pathname: '/search',
            query,
          });

          await client.refetch({ input: updatedArgs });
          setSearch([]);
          setHasMore(true);
          setArgs(updatedArgs);
        };

        return (
          <SearchLayout
            searchbar={
              <SearchBar searchArgs={searchArgs} updateArgs={refetch} />
            }
            sidebar={
              <SearchSidebar searchArgs={searchArgs} updateArgs={refetch} />
            }
            results={
              <SearchResults
                client={client}
                search={search}
                setSearch={setSearch}
                hasMore={hasMore}
                setHasMore={setHasMore}
              />
            }
          />
        );
      }}
    </SearchComponent>
  );
};
