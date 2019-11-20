import * as React from 'react';
import { Spin } from 'antd';
import { SpinProps } from 'antd/lib/spin';

import './style.less';

export const LoaderMask: React.SFC<SpinProps> = (props): JSX.Element => (
  <div className="loader-mask-container">
    <Spin {...props} />
  </div>
);
