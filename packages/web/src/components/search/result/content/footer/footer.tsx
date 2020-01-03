import React from 'react';
import { Button, Tag } from 'antd';

import styles from './style.less';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  openApplyModal: (value: boolean) => void;
  tags: string[];
}

export const SearchPreviewContentFooter: React.FunctionComponent<Props> = ({
  openApplyModal,
  tags,
  ...htmlProps
}) => (
  <div {...htmlProps}>
    <div className={styles.tags}>
      {tags.map(tag => (
        <Tag color="blue" key={tag}>
          {tag}
        </Tag>
      ))}
    </div>
    <Button type="primary" onClick={() => openApplyModal(true)}>
      Apply
    </Button>
  </div>
);
