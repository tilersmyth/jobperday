import React from 'react';
import { Empty, Button } from 'antd';

export const JobsNoResultsView: React.FunctionComponent = () => {
  return (
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No jobs exist yet">
      <Button size="large" type="primary" style={{ marginTop: 40 }}>
        Create job
      </Button>
    </Empty>
  );
};
