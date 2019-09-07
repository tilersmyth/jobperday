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

    const { user } = req.session;

    // Ensure user exists
    const me = await this.userService.findOne({ where: { id: user.id } });

    if (!me) {
      req.session.user = null;
      return next();
    }

    // Re-append user to session
    req.session.user = me;

    next();
  }
}
