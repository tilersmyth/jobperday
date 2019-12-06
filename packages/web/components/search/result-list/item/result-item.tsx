import React from 'react';
import { Typography, Icon } from 'antd';
import moment from 'moment';
import cx from 'classnames';

import { SearchQuery } from '../../../../apollo';
import styles from './style.less';

interface Props {
  posting: SearchQuery['search']['results'][0]['posting'];
  selectPosting: (id: string) => void;
  selectedId?: string;
}

export const SearchResultItem: React.FunctionComponent<Props> = ({
  posting,
  selectPosting,
  selectedId,
}) => {
  return (
    <div
      className={cx(styles.container, {
        [styles.active]: selectedId === posting.id,
      })}
      onClick={() => selectPosting(posting.id)}
    >
      <div className={styles.image}>
        <img src={posting.company.profile.profile_image} />
      </div>
      <div className={styles.content}>
        <Typography.Text strong={true} className={styles.item}>
          {posting.job.title}
        </Typography.Text>
        <div className={styles.item}>
          <Icon type="environment" className={styles.icon} />
          {posting.address.city}, {posting.address.state}
        </div>
        <div className={styles.item}>
          <span>
            <Icon type="dollar" className={styles.icon} />
            {posting.pay_rate}/hr
          </span>
          <span>
            <Icon type="calendar" className={styles.icon} />
            {moment.utc(posting.start_date).calendar()}
          </span>
        </div>
      </div>
    </div>
  );
};
