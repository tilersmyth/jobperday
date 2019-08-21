import { Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { UserDto } from './dto/user.dto';
import { UserEntity } from './entity';
import { GraphqlGuard, User as CurrentUser } from '../_helpers';

@UseGuards(GraphqlGuard)
@Resolver('User')
export class UserResolver {
  @Query(() => UserDto)
  async me(@CurrentUser() user: UserEntity): Promise<UserEntity> {
    return user;
  }
}
