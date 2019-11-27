import React from 'react';
import { Typography } from 'antd';
import { SearchFindJobQuery } from '../../../../apollo';

import styles from './style.less';

interface Props {
  job: SearchFindJobQuery['searchFindJob'];
}

export const SearchResultViewHeader: React.FunctionComponent<Props> = ({
  job,
}) => {
  if (!job) {
    return null;
  }
  return (
    <div
      className={styles.container}
      style={{ backgroundImage: `url(${job.default_image})` }}
    >
      <div className={styles.mask}>
        <Typography.Title className={styles.title} level={2}>
          {job.title}
        </Typography.Title>
        <Typography.Title className={styles.title} level={4}>
          {job.company.name}
        </Typography.Title>
      </div>
      <div className={styles.type}>{job.type}</div>
      <div className={styles.profile}>
        <div className={styles.imageContainer}>
          <img src={job.company.profile.profile_image} />
        </div>
      </div>
    </div>
  );
};
