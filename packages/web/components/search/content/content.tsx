import React, { useState, useEffect } from 'react';
import { QueryResult, useQuery } from 'react-apollo';
import { Row, Col } from 'antd';
import querystring from 'querystring';
import { useRouter } from 'next/router';

import {
  SearchQuery,
  ViewportQueryQuery,
  ViewportQueryDocument,
  SearchInput,
} from '../../../apollo/generated-components';
import { SearchResultList } from '../result-list';
import { SearchResultView } from '../result';
import { SearchAffix } from '../affix';
import { Breakpoints } from '../../../utils';
import { LoaderMask } from '../../shared';
import styles from './style.less';
import { SearchNoResults } from '../no-results';

interface Props {
  client: QueryResult<SearchQuery, { input: SearchInput }>;
}

interface LoadState {
  initData: boolean;
  initSkip: number;
}

export const SearchContent: React.FunctionComponent<Props> = props => {
  const [loadState, setLoadState] = useState<LoadState>({
    initData: true,
    initSkip: 0,
  });
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter();
  const { data, error, variables, fetchMore } = props.client;
  const { data: uiData } = useQuery<ViewportQueryQuery>(ViewportQueryDocument);
  const [selectedPosting, setSelectedPosting] = useState<string | undefined>(
    undefined,
  );

  if (!uiData || error || !data) {
    return null;
  }

  const onPostingSelect = async (
    id: string,
    skip: number | null,
    onLoad?: boolean,
  ) => {
    if (!onLoad) {
      const queryParams: { [key: string]: string } = {
        ...router.query,
        pId: id,
      };

      const scrollBuffer = 1;

      if (skip && skip + loadState.initSkip > scrollBuffer) {
        queryParams.skip = (
          skip +
          loadState.initSkip -
          scrollBuffer
        ).toString();
      }

      const href = `/search?${querystring.encode(queryParams)}`;
      const as = href;

      await router.push(href, as, { shallow: true });
    }

    if (Breakpoints[uiData.viewport] > Breakpoints.XL) {
      setSelectedPosting(id);
      return;
    }

    // todo
    // add routing here for smaller screens
  };

  useEffect(() => {
    if (data.search) {
      setHasMore(
        data.search.count > loadState.initSkip + data.search.results.length,
      );
    }

    if (!loadState.initData) {
      return;
    }

    const query = router.query as { [key: string]: string };

    if (query.skip) {
      setLoadState({ ...loadState, initSkip: parseInt(query.skip, 10) });
    }

    // Default to first posting in results
    if (data.search && data.search.results.length > 0) {
      // Need to consider here if stale post is loaded (how to handle?)

      const urlPostId = router.query.pId as string;
      const loadPost = urlPostId
        ? urlPostId
        : data.search.results[0].posting.id;

      onPostingSelect(loadPost, null, true);

      // scrollTo not working without delay
      setTimeout(
        () =>
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          }),
        300,
      );
    }
  }, [data, uiData]);

  const loadMore = () => {
    setLoadState({
      ...loadState,
      initData: false,
    });

    const input = {
      ...variables.input,
      pagination: {
        ...variables.input.pagination,
        skip: loadState.initSkip + data.search.results.length,
      },
    };

    return fetchMore({
      variables: { input },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult || fetchMoreResult.search.results.length === 0) {
          return prev;
        }

        return Object.assign({}, prev, {
          search: {
            count: fetchMoreResult.search.count,
            results: [
              ...prev.search.results,
              ...fetchMoreResult.search.results,
            ],
            __typename: 'Search2Dto',
          },
        });
      },
    });
  };

  if (data && data.search && data.search.count === 0) {
    return <SearchNoResults />;
  }

  return (
    <div className={styles.container}>
      <Row gutter={16}>
        <Col xl={9} xs={24}>
          <SearchResultList
            data={data}
            loadMore={loadMore}
            hasMore={hasMore}
            onPostingSelect={onPostingSelect}
            selectedPosting={selectedPosting}
          />
        </Col>
        <Col xl={15} xs={0}>
          <SearchAffix>
            <div className={styles.resultContainer}>
              <div className={styles.resultInner}>
                {!selectedPosting && <LoaderMask />}
                {selectedPosting && (
                  <SearchResultView postingId={selectedPosting} />
                )}
              </div>
            </div>
          </SearchAffix>
        </Col>
      </Row>
    </div>
  );
};
