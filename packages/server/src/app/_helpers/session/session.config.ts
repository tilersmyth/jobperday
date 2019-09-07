import Store from 'connect-redis';
import expressSession from 'express-session';

import { redis } from './redis';
import { config } from '../../../config';

export const session = () => {
  const RedisStore = Store(expressSession);
  const store = new RedisStore({
    client: redis as any,
  });

  return expressSession({
    store,
    name: 'qid',
    secret: config.session.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: config.env === 'production',
      expires: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    },
  });
};
