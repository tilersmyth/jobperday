import React from 'react';

import './style.less';
import { Card, Avatar } from 'antd';

interface Props {
  children: any;
}

export const CompanySidebar: React.FunctionComponent<Props> = ({
  children,
}) => (
  <Card className="company_sidebar" bordered={false}>
    <Card.Meta
      avatar={
        <Avatar src="https://pbs.twimg.com/profile_images/517308223716487168/FBTn9ivB_400x400.png" />
      }
      title="Wonder Bread"
    />
    {children}
  </Card>
);
