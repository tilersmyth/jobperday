import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';

import { UserService } from '../../user/user.service';

@Injectable()
export class UserAuthGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const ctx = GqlExecutionContext.create(context);
      const req: Request = ctx.getContext().req;

      if (!req.session || !req.session.user) {
        throw Error('No user session found');
      }

      const { id } = req.session.user;

      // Ensure user exists
      const user = await this.userService.findOneById(id);

      if (!user) {
        throw Error(`User not found by session ID: ${id}`);
      }

      // no easy way to exclude result property using typeorm
      // https://github.com/typeorm/typeorm/issues/535
      delete user.password;

      // Keep existing props (such as search) appended
      const me = { ...user, ...req.session.user };

      // Re-append user to session
      req.session.user = me;

      return true;
    } catch (error) {
      return false;
    }
  }
}
