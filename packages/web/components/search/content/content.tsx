import React, { useState, useEffect } from 'react';
import { useQuery, QueryResult } from 'react-apollo';
import { Row, Col } from 'antd';

import {
  ViewportQueryQuery,
  ViewportQueryDocument,
  SearchQuery,
} from '../../../apollo/generated-components';
import { SearchResultList } from '../result-list';
import { SearchResultView } from '../result';
import { Breakpoints } from '../../../utils';
import { SearchAffix } from '../affix';
import { SearchResults } from '../../shared';
import styles from './style.less';

interface Props {
  client: QueryResult<SearchQuery, Record<string, any>>;
  setSearch: (search: SearchResults) => void;
  search: SearchResults;
  setHasMore: (value: boolean) => void;
  hasMore: boolean;
}

export const SearchContent: React.FunctionComponent<Props> = props => {
  const [showJob, setShowJob] = useState(false);
  const [currentJobId, setCurrentJobId] = useState('');
  const { data } = useQuery<ViewportQueryQuery>(ViewportQueryDocument);

  if (!data) {
    return null;
  }

  useEffect(() => {
    if (Breakpoints[data.viewport] > Breakpoints.XL) {
      setShowJob(true);
      return;
    }
    setShowJob(false);
  }, [data.viewport]);

  const selectJob = (id: string) => {
    setCurrentJobId(id);

    if (Breakpoints[data.viewport] > Breakpoints.XL) {
      return;
    }
  };

  return (
    <div className={styles.container}>
      <Row gutter={16}>
        <Col xl={9} xs={24}>
          <SearchResultList
            {...props}
            selectJob={selectJob}
            selectedId={showJob ? currentJobId : undefined}
          />
        </Col>
        <Col xl={15} xs={0}>
          <SearchAffix>
            <div className={styles.result}>
              {showJob && <SearchResultView jobId={currentJobId} />}
            </div>
          </SearchAffix>
        </Col>
      </Row>
    </div>
  );
};
