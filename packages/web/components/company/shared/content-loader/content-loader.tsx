import * as React from 'react';
import { Spin } from 'antd';

import './style.less';

interface Prop {
  tip: string;
}

export const ContentLoader: React.SFC<Prop> = (props): JSX.Element => (
  <div className="content-loader-container">
    <Spin {...props} />
  </div>
);
