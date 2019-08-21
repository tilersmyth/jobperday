import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies';
import { UserModule } from '../user/user.module';
import { DatabaseModule } from '../database/database.module';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [UserModule, DatabaseModule],
  providers: [AuthService, JwtStrategy, AuthResolver],
})
export class AuthModule {}
