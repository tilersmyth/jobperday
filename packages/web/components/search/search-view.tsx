import React, { useState } from 'react';
import Router from 'next/router';
import { useQuery, useApolloClient } from 'react-apollo';
import ApolloClient from 'apollo-client';

import {
  SearchInput,
  SearchDocument,
  SearchQuery,
} from '../../apollo/generated-components';
import { SearchSidebar } from './sidebar';
import { SearchContent } from './content';
import { SearchLayout } from '../shared';
import { argsQueryString } from '../../utils';
import { SearchMobileDetail } from './mobile-detail';

interface Props {
  searchArgs: SearchInput;
  setLocation: (client: ApolloClient<object>) => void;
}

export const SearchView: React.FunctionComponent<Props> = ({
  searchArgs,
  setLocation,
}) => {
  const client = useApolloClient();
  const queryResult = useQuery<SearchQuery, { input: SearchInput }>(
    SearchDocument,
    {
      variables: { input: searchArgs },
      fetchPolicy: 'cache-and-network',
      partialRefetch: true,
      onCompleted: () => setLocation(client),
    },
  );

  const [args, setArgs] = useState(searchArgs);

  const handleArgsUpdate = async (input: SearchInput) => {
    // Add variables to url
    const href = argsQueryString(input);
    const as = href;
    await Router.push(href, as);

    await queryResult.refetch({ input });

    setArgs(input);
  };

  return (
    <SearchLayout searchArgs={args} updateArgs={handleArgsUpdate}>
      <SearchSidebar
        data={queryResult.data}
        searchArgs={args}
        setSearchArgs={handleArgsUpdate}
      />
      <SearchMobileDetail
        data={queryResult.data}
        searchArgs={args}
        setSearchArgs={handleArgsUpdate}
      />
      <SearchContent client={queryResult} />
    </SearchLayout>
  );
};
