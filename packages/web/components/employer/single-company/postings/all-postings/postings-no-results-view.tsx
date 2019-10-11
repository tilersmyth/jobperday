import React from 'react';
import { Empty, Button } from 'antd';

interface Props {
  companySlug: string;
  openModal: (action: boolean) => void;
}

export const PostingsNoResultsView: React.FunctionComponent<Props> = ({
  openModal,
}) => (
  <Empty
    image={Empty.PRESENTED_IMAGE_SIMPLE}
    description="No postings exist yet"
  >
    <Button
      size="large"
      type="primary"
      style={{ marginTop: 40 }}
      onClick={() => openModal(true)}
    >
      Create posting
    </Button>
  </Empty>
);
