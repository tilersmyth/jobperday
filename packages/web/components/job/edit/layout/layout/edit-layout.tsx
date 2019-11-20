import React from 'react';
import { Spin } from 'antd';

import './style.less';

interface Props {
  loading: boolean;
  children: any;
}

export const EditJobLayout: React.FunctionComponent<Props> = ({
  loading,
  children,
}) => {
  return (
    <div className="edit-job-layout-container">
      {loading && (
        <div className="content-loader">
          <Spin />
        </div>
      )}
      {children}
    </div>
  );
};
