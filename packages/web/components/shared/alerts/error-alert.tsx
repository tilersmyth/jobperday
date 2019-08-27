import React from 'react';
import { Alert } from 'antd';
import { Typography } from 'antd';

interface Prop {
  message: string;
}

const Message: React.FunctionComponent<Prop> = ({ message }) => (
  <Typography.Text strong={true} style={{ color: '#cb312e' }}>
    {message}
  </Typography.Text>
);

export const ErrorAlert: React.FunctionComponent<Prop> = ({ message }) => (
  <Alert
    style={{ borderWidth: 3 }}
    message={<Message message={message} />}
    type="error"
  />
);
