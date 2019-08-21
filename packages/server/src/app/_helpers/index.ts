import crypto from 'crypto';
import { config } from '../../config';

export * from './graphql';
export * from './database';
export * from './request-context';
export * from './middleware';

export const ucfirst = string => {
  return string[0].toUpperCase() + string.slice(1);
};

export const hashPassword = (password: string) => {
  return crypto
    .createHmac('sha256', config.salt)
    .update(password, 'utf8')
    .digest('hex');
};
