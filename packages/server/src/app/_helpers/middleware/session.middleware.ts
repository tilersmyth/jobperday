import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, Request, NextFunction } from 'express';
import Store from 'connect-redis';
import expressSession from 'express-session';
import Redis from 'ioredis';

import { config } from '../../../config';

@Injectable()
export class ExpressSessionMiddleware implements NestMiddleware {
  private readonly redis = new Redis();
  private readonly RedisStore = Store(expressSession);
  private readonly store = new this.RedisStore({
    client: this.redis as any,
  });

  use(req: Request, res: Response, next: NextFunction) {
    return expressSession({
      store: this.store,
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
    })(req, res, next);
  }
}
