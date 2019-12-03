import React, { useState, useEffect } from 'react';
import { QueryResult, useQuery } from 'react-apollo';
import { Row, Col } from 'antd';

import {
  SearchQuery,
  ViewportQueryQuery,
  ViewportQueryDocument,
} from '../../../apollo/generated-components';
import { SearchResultList } from '../result-list';
import { SearchResultView } from '../result';
import { SearchAffix } from '../affix';
import { Breakpoints } from '../../../utils';
import styles from './style.less';
import { LoaderMask } from '../../shared';

interface Props {
  client: QueryResult<SearchQuery, Record<string, any>>;
  setHasMore: (value: boolean) => void;
  hasMore: boolean;
}

export const SearchContent: React.FunctionComponent<Props> = props => {
  const { loading, data, error, variables, fetchMore } = props.client;
  const { data: vpData } = useQuery<ViewportQueryQuery>(ViewportQueryDocument);
  const [selectedJob, setSelectedJob] = useState<string | undefined>(undefined);
  const [initLoad, setInitLoad] = useState(true);

  if (!vpData || error || !data) {
    return null;
  }

  useEffect(() => {
    if (!initLoad) {
      return;
    }

    if (data.search && data.search.results.length > 0) {
      onJobSelect(data.search.results[0].job.id);
    }
  }, [data]);

  const onJobSelect = (id: string) => {
    if (Breakpoints[vpData.viewport] > Breakpoints.XL) {
      setSelectedJob(id);
      return;
    }

    // todo
    // add routing here for smaller screens
  };

  const loadMore = () => {
    if (loading) {
      return null;
    }

    setInitLoad(false);

    const input = {
      ...variables.input,
      pagination: {
        ...variables.input.pagination,
        skip: data.search.results.length,
      },
    };

    return fetchMore({
      variables: { input },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return prev;
        }

        if (fetchMoreResult.search.results.length === 0) {
          return prev;
        }

        return Object.assign({}, prev, {
          search: {
            count: fetchMoreResult.search.count,
            results: [
              ...prev.search.results,
              ...fetchMoreResult.search.results,
            ],
            __typename: 'SearchDto',
          },
        });
      },
    });
  };

  return (
    <div className={styles.container}>
      <Row gutter={16}>
        <Col xl={9} xs={24}>
          <SearchResultList
            data={data}
            loadMore={loadMore}
            onJobSelect={onJobSelect}
            selectedJob={selectedJob}
          />
        </Col>
        <Col xl={15} xs={0}>
          <SearchAffix>
            <div className={styles.resultContainer}>
              <div className={styles.resultInner}>
                {!selectedJob && <LoaderMask />}
                {selectedJob && <SearchResultView selectedJob={selectedJob} />}
              </div>
            </div>
          </SearchAffix>
        </Col>
      </Row>
    </div>
  );
};
