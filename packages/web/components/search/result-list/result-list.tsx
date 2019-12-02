import React from 'react';
import { QueryResult } from 'react-apollo';
import InfiniteScroll from 'react-infinite-scroller';
import { Spin } from 'antd';

import { SearchQuery } from '../../../apollo';
import { SearchResultItem } from './item';
import { SearchResults } from '../search-type';

interface Props {
  client: QueryResult<SearchQuery, Record<string, any>>;
  setSearch: (results: SearchResults) => void;
  search: SearchResults;
  setHasMore: (value: boolean) => void;
  hasMore: boolean;
  selectJob: (id: string) => void;
  selectedId?: string;
}

export const SearchResultList: React.FunctionComponent<Props> = ({
  client,
  setSearch,
  search,
  setHasMore,
  hasMore,
  selectJob,
  selectedId,
}) => {
  const { loading, data, error, variables, fetchMore } = client;

  if (error || !data) {
    console.log('search results error');
    return null;
  }

  const loadMore = async (page: number) => {
    if (loading) {
      return null;
    }

    if (page === 1) {
      setSearch({ ...data.search, loading: false });

      if (data.search.results.length > 0) {
        selectJob(data.search.results[0].job.id);
      }
      return;
    }

    const input = {
      ...variables.input,
      pagination: {
        ...variables.input.pagination,
        skip: search.results.length,
      },
    };

    await fetchMore({
      variables: { input },
      updateQuery: (_: any, { fetchMoreResult }: any) => {
        if (fetchMoreResult.search.results.length === 0) {
          setHasMore(false);
          return;
        }

        const results = Object.assign({}, search, {
          loading: false,
          count: fetchMoreResult.search.count,
          results: [...search.results, ...fetchMoreResult.search.results],
        });

        setSearch(results);
      },
    });
  };

  const items = search.results.map(({ job }) => (
    <SearchResultItem
      key={job.id}
      job={job}
      selectedId={selectedId}
      selectJob={selectJob}
    />
  ));

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={loadMore}
      hasMore={hasMore}
      loader={<Spin key={0} />}
    >
      {items}
    </InfiniteScroll>
  );
};
