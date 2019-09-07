import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { userProviders } from './user.providers';
import { UserService } from './user.service';
import { IsUserAlreadyExist } from './user.validator';
import { UserResolver } from './user.resolver';

import { MailService } from '../_helpers';
import { UserMiddleware } from './middleware';

const PROVIDERS = [
  ...userProviders,
  IsUserAlreadyExist,
  UserService,
  UserResolver,
  MailService,
];

@Module({
  providers: [...PROVIDERS],
  imports: [DatabaseModule],
  exports: [UserService],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
