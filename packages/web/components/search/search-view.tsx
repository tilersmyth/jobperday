import React, { useState } from 'react';
import Router from 'next/router';
import { useQuery, useApolloClient } from 'react-apollo';
import ApolloClient from 'apollo-client';
import querystring from 'querystring';

import {
  SearchInput,
  SearchDocument,
  SearchQuery,
} from '../../apollo/generated-components';
import { SearchSidebar } from './sidebar';
import { SearchContent } from './content';
import { SearchLayout } from '../shared';
import { searchToQuery } from '../../utils';
import { SearchMobileDetail } from './mobile-detail';

interface Props {
  searchArgs: SearchInput;
  onCompleted: (client: ApolloClient<object>) => void;
}

export const SearchView: React.FunctionComponent<Props> = ({
  searchArgs,
  onCompleted,
}) => {
  const client = useApolloClient();
  const qeuryResult = useQuery<SearchQuery>(SearchDocument, {
    variables: { input: searchArgs },
    fetchPolicy: 'cache-and-network',
    onCompleted: () => onCompleted(client),
  });

  const [hasMore, setHasMore] = useState(true);
  const [args, setArgs] = useState(searchArgs);

  const handleArgsUpdate = async (input: SearchInput) => {
    const query = searchToQuery(input);

    // Add variables to url
    const path = `/search?${querystring.encode(query)}`;
    await Router.push(path, path);

    await qeuryResult.refetch({ input });

    setArgs(input);
  };

  return (
    <SearchLayout searchArgs={args} updateArgs={handleArgsUpdate}>
      <SearchSidebar
        data={qeuryResult.data}
        searchArgs={args}
        setSearchArgs={handleArgsUpdate}
      />
      <SearchMobileDetail
        data={qeuryResult.data}
        searchArgs={args}
        setSearchArgs={handleArgsUpdate}
      />
      <SearchContent
        client={qeuryResult}
        setHasMore={setHasMore}
        hasMore={hasMore}
      />
    </SearchLayout>
  );
};
