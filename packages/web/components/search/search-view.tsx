import React, { useState } from 'react';
import Router from 'next/router';
import { Layout } from 'antd';
import { useQuery } from 'react-apollo';

import {
  SearchInput,
  SearchQuery,
  SearchDocument,
} from '../../apollo/generated-components';
import { SearchSidebar } from './sidebar';
import { SearchContent } from './content';
import { CandidateLayout, SearchHeader, SearchDrawer } from '../shared';
import { searchToQuery } from '../../utils';
import styles from './style.less';

interface Props {
  searchArgs: SearchInput;
}

export const CandidateSearchView: React.FunctionComponent<Props> = ({
  searchArgs,
}) => {
  const client = useQuery<SearchQuery>(SearchDocument, {
    variables: { input: searchArgs },
    fetchPolicy: 'cache-and-network',
  });

  const [results, setResults] = useState<SearchQuery['search']['results']>([]);
  const [hasMore, setHasMore] = useState(true);
  const [args, setArgs] = useState(searchArgs);
  const [drawer, openDrawer] = useState(false);

  const handleArgsUpdate = async (input: SearchInput) => {
    const query = searchToQuery(input);

    // Add variables to url
    await Router.push({
      pathname: '/search',
      query,
    });

    await client.refetch({ input });

    setResults([]);
    setHasMore(true);
    setArgs(input);
  };

  return (
    <CandidateLayout title="Search">
      <Layout className={styles.container}>
        <SearchHeader searchArgs={args} openDrawer={openDrawer} />
        <Layout.Content className={styles.content}>
          <SearchSidebar searchArgs={args} updateArgs={handleArgsUpdate} />
          <SearchContent
            client={client}
            setResults={setResults}
            results={results}
            setHasMore={setHasMore}
            hasMore={hasMore}
          />
        </Layout.Content>
      </Layout>
      <SearchDrawer
        visible={drawer}
        searchArgs={args}
        updateArgs={handleArgsUpdate}
        close={() => openDrawer(false)}
      />
    </CandidateLayout>
  );
};
