import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, Request, NextFunction } from 'express';
import cls from 'cls-hooked';
import { RequestContext } from '../request-context';

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const requestContext = new RequestContext(req, res);
    const session =
      cls.getNamespace(RequestContext.nsid) ||
      cls.createNamespace(RequestContext.nsid);

    session.run(async () => {
      session.set(RequestContext.name, requestContext);
      next();
    });
  }
}
