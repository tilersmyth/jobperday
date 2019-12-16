import { Resolver, Query } from '@nestjs/graphql';

import { UserDto } from './dto/user.dto';
import { UserEntity } from './entity';
import { User as CurrentUser } from '../_helpers';
import { UserService } from './user.service';
import { UserSession } from './interfaces/user-session.interface';
import { UserSessionDto } from './dto/session.dto';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserSessionDto, { nullable: true })
  async me(@CurrentUser() user: UserSession): Promise<UserSession | null> {
    return user;
  }

  @Query(() => [UserDto])
  async allUsers(): Promise<UserEntity[]> {
    return this.userService.find();
  }
}
