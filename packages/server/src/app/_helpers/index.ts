import crypto from 'crypto';
import { config } from '../../config';

export * from './graphql';
export * from './database';
export * from './decorators';
export * from './scalars';
export * from './services';
export * from './session';
export * from './mail';
export * from './slug-generator.util';

export const ucfirst = (string: string[]) => {
  return string[0].toUpperCase() + string.slice(1);
};

export const hashPassword = (password: string) => {
  return crypto
    .createHmac('sha256', config.salt)
    .update(password, 'utf8')
    .digest('hex');
};
