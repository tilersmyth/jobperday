import React from 'react';
import { Tag } from 'antd';

import { FindPostingQuery, PostingStatusEnum } from '../../../../../apollo';
import styles from './style.less';

interface Props {
  loading: boolean;
  posting: FindPostingQuery['findPosting'];
}

export const PostingTitle: React.FunctionComponent<Props> = ({
  loading,
  posting,
}) => {
  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div className={styles.container}>
      <span className={styles.title}>{posting.job.title}</span>
      {posting.status === PostingStatusEnum.Open ? (
        <Tag color="green">OPEN</Tag>
      ) : (
        <Tag color="red">CLOSED</Tag>
      )}
    </div>
  );
};
