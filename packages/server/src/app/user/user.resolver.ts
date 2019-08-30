import { Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { UserDto } from './dto/user.dto';
import { UserEntity } from './entity';
import { User as CurrentUser } from '../_helpers';
import { UserAuthGuard } from '../auth/guards/user-auth.guard';

@Resolver('User')
@UseGuards(UserAuthGuard)
export class UserResolver {
  @Query(() => UserDto)
  async me(@CurrentUser() user: UserEntity): Promise<UserEntity> {
    return user;
  }
}
