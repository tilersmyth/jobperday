import React from 'react';
import { Typography, Divider } from 'antd';

import { SearchQuery } from '../../../../../../apollo';
import { LoaderMask } from '../../../../loader';
import styles from './style.less';

interface Props {
  data?: SearchQuery;
}

export const SearchResultDetail: React.FunctionComponent<Props> = ({
  data,
}) => {
  if (!data) {
    return null;
  }

  return (
    <React.Fragment>
      <div className={styles.container}>
        {!data.search && <LoaderMask />}
        {data.search && (
          <Typography.Title level={3} style={{ display: 'block' }}>
            Displaying {data.search.results.length} out of {data.search.count}{' '}
            results
          </Typography.Title>
        )}
      </div>
      <Divider className={styles.divider} />
    </React.Fragment>
  );
};
