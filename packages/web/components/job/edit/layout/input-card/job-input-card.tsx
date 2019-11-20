import React from 'react';
import { Card, Form, Tooltip, Icon } from 'antd';
import { CardProps } from 'antd/lib/card';

import './style.less';

interface Props extends CardProps {
  title: string;
  children: React.ReactNode;
  hint?: string;
}

const TitleHint: React.FunctionComponent<{
  title: string;
  hint: string;
}> = ({ title, hint }) => (
  <React.Fragment>
    {title}{' '}
    <Tooltip title={hint}>
      <Icon type="question-circle" />
    </Tooltip>
  </React.Fragment>
);

export const JobInputCard: React.FunctionComponent<Props> = ({
  title,
  children,
  hint,
  ...props
}) => (
  <Form.Item>
    <Card
      title={hint ? <TitleHint title={title} hint={hint} /> : title}
      bordered={false}
      {...props}
    >
      {children}
    </Card>
  </Form.Item>
);
