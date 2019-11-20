import React from 'react';
import { Button } from 'antd';

import { CompanyPageHeader } from '../../../../shared';

export const EditApplicationHeader: React.FunctionComponent = () => (
  <CompanyPageHeader
    title={'Application'}
    extra={[
      <Button
        key="create"
        type="primary"
        ghost={true}
        htmlType="submit"
        loading={false}
      >
        {'Save Application'}
      </Button>,
    ]}
  />
);
