import React from 'react';
import { Alert } from 'antd';
import { Typography } from 'antd';

interface Prop {
  message: string;
}

const Message: React.FunctionComponent<Prop> = ({ message }) => (
  <Typography.Text strong={true} style={{ color: '#ffffff' }}>
    {message}
  </Typography.Text>
);

export const SuccessAlert: React.FunctionComponent<Prop> = ({ message }) => (
  <Alert message={<Message message={message} />} type="success" />
);
