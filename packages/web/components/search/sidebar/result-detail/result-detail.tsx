import React from 'react';
import { Typography, Divider } from 'antd';

import { SearchResults } from '../../search-type';
import { LoaderMask } from '../../../shared';
import styles from './style.less';

interface Props {
  search: SearchResults;
}

export const SearchResultDetail: React.FunctionComponent<Props> = ({
  search: { loading, results, count },
}) => (
  <React.Fragment>
    <div className={styles.container}>
      {loading && <LoaderMask />}
      {!loading && (
        <Typography.Title level={3} style={{ display: 'block' }}>
          Displaying {results.length} out of {count} results
        </Typography.Title>
      )}
    </div>
    <Divider className={styles.divider} />
  </React.Fragment>
);
