import React from 'react';
import { Typography } from 'antd';
import moment from 'moment';
import cx from 'classnames';

import { SearchQuery } from '../../../../apollo';
import { ProfileAvatar, Icon } from '../../../shared';
import styles from './style.less';

interface Props {
  posting: SearchQuery['search']['results'][0]['posting'];
  index: number;
  selectPosting: (id: string, index: number) => Promise<void>;
  selectedId?: string;
}

export const SearchResultItem: React.FunctionComponent<Props> = ({
  posting,
  index,
  selectPosting,
  selectedId,
}) => {
  return (
    <div
      className={cx(styles.container, {
        [styles.active]: selectedId === posting.id,
      })}
      onClick={() => selectPosting(posting.id, index)}
    >
      <div className={styles.image}>
        {posting.company.profile.profile_image ? (
          <img src={posting.company.profile.profile_image} />
        ) : (
          <ProfileAvatar
            companyName={posting.company.name}
            color={posting.company.profile.color}
            size={80}
            shape="square"
          />
        )}
      </div>
      <div className={styles.content}>
        <Typography.Text strong={true} className={styles.item}>
          {posting.job.title}
        </Typography.Text>
        <div className={styles.item}>
          <Icon type="map-pin-2-line" className={styles.icon} />
          {posting.address.city}, {posting.address.state}
        </div>
        <div className={styles.item}>
          <span>
            <Icon type="money-dollar-circle-line" className={styles.icon} />
            {posting.pay_rate}
          </span>
          <span>
            <Icon type="calendar-line" className={styles.icon} />
            {moment.utc(posting.start_date).calendar()}
          </span>
        </div>
      </div>
    </div>
  );
};
