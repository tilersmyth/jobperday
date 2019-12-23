import React from 'react';
import { Button, Icon, Typography } from 'antd';

import { SearchFindPostingQuery } from '../../../../../apollo';
import styles from './style.less';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  openApplyModal: (value: boolean) => void;
  address: SearchFindPostingQuery['searchFindPosting']['address'];
}

export const SearchPreviewContentHeader: React.FunctionComponent<Props> = ({
  openApplyModal,
  address,
  ...htmlProps
}) => (
  <div {...htmlProps}>
    <Typography.Text className={styles.text} type="secondary">
      <Icon type="environment" className={styles.icon} />
      {address.city}, {address.state}
    </Typography.Text>
    <Button type="primary" onClick={() => openApplyModal(true)}>
      Apply
    </Button>
  </div>
);
