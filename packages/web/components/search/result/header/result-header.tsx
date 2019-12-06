import React from 'react';
import { Typography } from 'antd';
import { SearchFindPostingQuery } from '../../../../apollo';

import styles from './style.less';

interface Props {
  posting: SearchFindPostingQuery['searchFindPosting'];
}

export const SearchResultViewHeader: React.FunctionComponent<Props> = ({
  posting,
}) => {
  if (!posting) {
    return null;
  }
  return (
    <div
      className={styles.container}
      style={{ backgroundImage: `url(${posting.job.default_image})` }}
    >
      <div className={styles.mask}>
        <Typography.Title className={styles.title} level={2}>
          {posting.job.title}
        </Typography.Title>
        <Typography.Title className={styles.title} level={4}>
          {posting.company.name}
        </Typography.Title>
      </div>
      <div className={styles.type}>{posting.job.type}</div>
      <div className={styles.profile}>
        <div className={styles.imageContainer}>
          <img src={posting.company.profile.profile_image} />
        </div>
      </div>
    </div>
  );
};
