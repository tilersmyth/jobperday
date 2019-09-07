import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
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

      const { user } = req.session;

      // Ensure user exists
      const me = await this.userService.findOneById(user.id);

      if (!me) {
        throw Error(`User not found by session ID: ${user.id}`);
      }

      // Re-append user to session
      req.session.user = me;

      return true;
    } catch (error) {
      return false;
    }
  }
}
