import React from 'react';
import { Typography, Icon } from 'antd';
import moment from 'moment';
import cx from 'classnames';

import { SearchQuery } from '../../../../apollo';
import styles from './style.less';

interface Props {
  job: SearchQuery['search']['results'][0]['job'];
  selectJob: (id: string) => void;
  selectedId?: string;
}

export const SearchResultItem: React.FunctionComponent<Props> = ({
  job,
  selectJob,
  selectedId,
}) => {
  const dateDiff = (value: Date) => {
    return new Date().getTime() - new Date(value).getTime();
  };

  const postings = job.postings.sort((a, b) => {
    const distancea = Math.abs(dateDiff(a.start_date));
    const distanceb = Math.abs(dateDiff(b.start_date));
    return distancea - distanceb;
  });

  return (
    <div
      className={cx(styles.container, {
        [styles.active]: selectedId === job.id,
      })}
      onClick={() => selectJob(job.id)}
    >
      <div className={styles.image}>
        <img src={job.company.profile.profile_image} />
      </div>
      <div className={styles.content}>
        <Typography.Text strong={true} className={styles.item}>
          {job.title}
        </Typography.Text>
        <div className={styles.item}>
          <Icon type="environment" className={styles.icon} />
          {postings[0].address.city}, {postings[0].address.state}
        </div>
        <div className={styles.item}>
          <span>
            <Icon type="dollar" className={styles.icon} />
            {postings[0].pay_rate}/hr
          </span>
          <span>
            <Icon type="calendar" className={styles.icon} />
            {moment.utc(postings[0].start_date).calendar()}
          </span>
        </div>
      </div>
    </div>
  );
};
