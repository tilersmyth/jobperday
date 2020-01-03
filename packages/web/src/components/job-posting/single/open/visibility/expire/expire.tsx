import React from 'react';
import moment from 'moment';
import { Typography } from 'antd';

import { FindPostingQuery } from '../../../../../../apollo';

interface Props {
  posting: FindPostingQuery['findPosting'];
}

export const PostingExpireText: React.FunctionComponent<Props> = ({
  posting,
}) => {
  const within24Hrs = (date: string) => {
    // https://momentjs.com/docs/#/displaying/fromnow/
    const momentDayMax = 35;
    return moment.utc(date).diff(moment.utc(), 'h') < momentDayMax;
  };

  const expiresIn = moment.utc(posting.apply_deadline).fromNow();

  return (
    <Typography.Text
      strong={true}
      type={within24Hrs(posting.apply_deadline) ? 'danger' : undefined}
    >
      This post is set to expire {expiresIn}
    </Typography.Text>
  );
};
