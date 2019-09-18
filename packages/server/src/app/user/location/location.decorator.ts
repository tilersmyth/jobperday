import { createParamDecorator } from '@nestjs/common';
import requestIp from 'request-ip';

export const Location = createParamDecorator(
  (data, [root, args, ctx, info]) => {
    return requestIp.getClientIp(ctx.req);
  },
);
