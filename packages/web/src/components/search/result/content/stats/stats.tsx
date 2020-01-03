import React from 'react';
import { Statistic } from 'antd';
import moment from 'moment';

import { SearchFindPostingQuery } from '../../../../../apollo';
import styles from './style.less';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  posting: SearchFindPostingQuery['searchFindPosting'];
}

export const SearchPreviewStats: React.FunctionComponent<Props> = ({
  posting,
  ...htmlProps
}) => {
  return (
    <div {...htmlProps}>
      <Statistic
        className={styles.item}
        title="Hourly Rate"
        value={`$${posting.pay_rate}`}
      />

      <Statistic
        className={styles.item}
        title="Openings"
        value={posting.remaining_openings}
      />

      <Statistic
        className={styles.item}
        title="When"
        value={moment.utc(posting.start_date).calendar(undefined, {
          sameDay: '[Today]',
          nextDay: '[Tomorrow]',
          nextWeek: 'dddd',
          lastDay: '[Yesterday]',
          lastWeek: '[Last] dddd',
          sameElse: 'MM/DD/YY',
        })}
      />

      <Statistic
        className={styles.item}
        title="Time"
        value={moment.utc(posting.start_date).format('h:mm a')}
      />

      <Statistic
        className={styles.item}
        title="Expires"
        value={moment.utc(posting.apply_deadline).fromNow()}
      />
    </div>
  );
};
