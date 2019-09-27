import React from 'react';
import { QueryResult } from 'react-apollo';
import InfiniteScroll from 'react-infinite-scroller';
import { Spin } from 'antd';

import {
  SearchQuery,
  SearchQueryVariables,
} from '../../../apollo/generated-components';
import { ResultsHeader } from './results-header';
import { ResultCard } from './result-card';

interface Props {
  client: QueryResult<SearchQuery, SearchQueryVariables>;
  results: SearchQuery['search']['results'];
  setSearch: any;
  hasMore: any;
  setHasMore: any;
}

export const SearchResults: React.SFC<Props> = ({
  client: { data, loading, error, fetchMore, variables },
  results,
  setSearch,
  hasMore,
  setHasMore,
}) => {
  if (error || !data) {
    return <div>ERRROR</div>;
  }

  const loadMore = async (page: number) => {
    if (loading) {
      return null;
    }

    if (page === 1) {
      setSearch(data.search.results);
      return;
    }

    const input = {
      ...variables.input,
      pagination: {
        ...variables.input.pagination,
        skip: results.length,
      },
    };

    await fetchMore({
      variables: { input },
      updateQuery: (_: any, { fetchMoreResult }: any) => {
        if (fetchMoreResult.search.results.length === 0) {
          setHasMore(false);
          return;
        }

        setSearch([...results, ...fetchMoreResult.search.results]);
      },
    });
  };

  const items = results.map(result => (
    <ResultCard key={result.job.id} result={result} />
  ));

  return (
    <React.Fragment>
      <ResultsHeader
        loading={loading}
        results={data.search}
        locality={variables.input.location.locality}
      />

      <React.Fragment>
        <InfiniteScroll
          pageStart={0}
          loadMore={loadMore}
          hasMore={hasMore}
          loader={<Spin key={0} />}
        >
          {items}
        </InfiniteScroll>
      </React.Fragment>
    </React.Fragment>
  );
};
