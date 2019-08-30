import { Module } from '@nestjs/common';

import { UserModule } from '../user/user.module';
import { DatabaseModule } from '../database/database.module';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [UserModule, DatabaseModule],
  providers: [AuthResolver],
})
export class AuthModule {}
