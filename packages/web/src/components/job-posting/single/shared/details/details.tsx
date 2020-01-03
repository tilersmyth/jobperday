import React from 'react';
import { Typography } from 'antd';
import moment from 'moment';

import { FindPostingQuery } from '../../../../../apollo';
import { addressFormatter } from '../../../../../utils';
import { LoaderMask } from '../../../../shared';
import styles from './style.less';

interface Props {
  loading: boolean;
  posting: FindPostingQuery['findPosting'];
}

export const PostingDetailsCard: React.FunctionComponent<Props> = ({
  loading,
  posting,
}) => {
  const formatDate = (date: string) => {
    return moment.utc(date).calendar(undefined, {
      sameDay: '[Today]',
      nextDay: '[Tomorrow]',
      nextWeek: 'dddd',
      lastDay: '[Yesterday]',
      lastWeek: '[Last] dddd',
      sameElse: 'MM/DD/YY',
    });
  };

  return (
    <div className={styles.details}>
      {loading && <LoaderMask />}
      {!loading && (
        <ul>
          <li>
            <Typography.Text strong={true} className={styles.title}>
              Where
            </Typography.Text>
            <Typography.Text>
              {addressFormatter(posting.address)}
            </Typography.Text>
          </li>
          <li>
            <Typography.Text strong={true} className={styles.title}>
              When
            </Typography.Text>
            <Typography.Text>{`${formatDate(
              posting.start_date,
            )}, 2-4p`}</Typography.Text>
          </li>
          <li>
            <Typography.Text strong={true} className={styles.title}>
              Hourly rate
            </Typography.Text>
            <Typography.Text>{`$${posting.pay_rate}`}</Typography.Text>
          </li>
        </ul>
      )}
    </div>
  );
};
