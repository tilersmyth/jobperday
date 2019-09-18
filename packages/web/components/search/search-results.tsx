import React from 'react';
import { QueryResult } from 'react-apollo';
import { Typography } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';

import {
  SearchQuery,
  SearchQueryVariables,
} from '../../apollo/generated-components';

interface Props {
  client: QueryResult<SearchQuery, SearchQueryVariables>;
  search: any;
  setSearch: any;
  hasMore: any;
  setHasMore: any;
}

interface Props2 {
  children: any;
}

const TempText: React.FunctionComponent<Props2> = ({ children }) => (
  <Typography.Text
    strong={true}
    style={{
      display: 'block',
      marginBottom: 10,
      marginTop: 10,
      backgroundColor: 'red',
      height: 500,
    }}
  >
    {children}
  </Typography.Text>
);

const Results = ({ results }: any) =>
  results.map((result: any) => (
    <TempText key={result.job.name}>{result.job.name}</TempText>
  ));

export const SearchResults: React.SFC<Props> = ({
  client: { data, loading, error, fetchMore, variables },
  search,
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
        skip: search.length,
      },
    };

    await fetchMore({
      variables: { input },
      updateQuery: (_: any, { fetchMoreResult }: any) => {
        if (fetchMoreResult.search.results.length === 0) {
          setHasMore(false);
          return;
        }

        setSearch([...search, ...fetchMoreResult.search.results]);
      },
    });
  };

  return (
    <React.Fragment>
      {data.search && (
        <Typography.Title>
          {`Displaying ${search.length} out of ${data.search.count} results${
            data.search.count === 1 ? '' : 's'
          }`}
        </Typography.Title>
      )}
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        hasMore={hasMore}
        loader={
          <div className="loader" key={0}>
            Loading ...
          </div>
        }
      >
        <Results results={search} />
      </InfiniteScroll>
    </React.Fragment>
  );
};
