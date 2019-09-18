import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserService } from '../user.service';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: Request, _: Response, next: NextFunction) {
    if (!req.session || !req.session.user) {
      req.session.user = null;
      return next();
    }

    const { id } = req.session.user;

    // Ensure user exists
    const user = await this.userService.findOne({ where: { id } });

    if (!user) {
      req.session.user = null;
      return next();
    }

    // no easy way to exclude result property using typeorm
    // https://github.com/typeorm/typeorm/issues/535
    delete user.password;

    // Keep existing props (such as search) appended
    const me = { ...user, ...req.session.user };

    // Re-append user to session
    req.session.user = me;

    next();
  }
}
