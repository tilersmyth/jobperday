import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { userProviders } from './user.providers';
import { UserService } from './user.service';
import { IsUserAlreadyExist } from './user.validator';
import { UserResolver } from './user.resolver';

const PROVIDERS = [
  ...userProviders,
  IsUserAlreadyExist,
  UserService,
  UserResolver,
];

@Module({
  providers: [...PROVIDERS],
  imports: [DatabaseModule],
  exports: [UserService],
})
export class UserModule {}
