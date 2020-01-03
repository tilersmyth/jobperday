import React from 'react';
import { Button, Card } from 'antd';
import { CardProps } from 'antd/lib/card';

import { FindPostingQuery } from '../../../../../apollo';
import { PostingExpireText } from './expire';

interface Props extends CardProps {
  posting: FindPostingQuery['findPosting'];
}

export const PostingVisibilityCard: React.FunctionComponent<Props> = ({
  posting,
  ...cardProps
}) => {
  const onClose = () => {
    console.log('close posting early');
  };

  return (
    <Card bordered={false} title="Visibility" {...cardProps}>
      <PostingExpireText posting={posting} />
      <Button onClick={onClose} style={{ display: 'block', marginTop: 20 }}>
        Change Expiration
      </Button>
    </Card>
  );
};
