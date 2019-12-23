import React from 'react';
import { Typography } from 'antd';
import cx from 'classnames';

import { SearchFindPostingQuery } from '../../../../apollo';
import { ProfileAvatar } from '../../../shared';
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
      <div className={cx(styles.type, styles[posting.company.profile.color])}>
        {posting.job.type}
      </div>
      <div className={styles.profile}>
        <div className={styles.imageContainer}>
          {posting.company.profile.profile_image ? (
            <img src={posting.company.profile.profile_image} />
          ) : (
            <ProfileAvatar
              color={posting.company.profile.color}
              companyName={posting.company.name}
              size={150}
              shape="square"
            />
          )}
        </div>
      </div>
    </div>
  );
};
