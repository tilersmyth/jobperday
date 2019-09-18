import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';

@Injectable()
export class SearchInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<void> {
    const ctx = GqlExecutionContext.create(context);
    const req: Request = ctx.getContext().req;

    if (!req.session || !req.session.user) {
      return next.handle();
    }

    // If user session exists, lets remember search location
    // (amount many reasons, hit Google Place API less)
    const { input } = ctx.getArgs();

    req.session.user = {
      ...req.session.user,
      search: input.location,
    };

    return next.handle();
  }
}
