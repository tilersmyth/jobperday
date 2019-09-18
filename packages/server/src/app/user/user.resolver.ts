import { Resolver, Query } from '@nestjs/graphql';

import { UserDto } from './dto/user.dto';
import { UserEntity } from './entity';
import { User as CurrentUser } from '../_helpers';
import { UserService } from './user.service';
import { MeSession } from './interfaces/me-session.interface';
import { MeSessionDto } from './dto/me-session.dto';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => MeSessionDto, { nullable: true })
  async me(@CurrentUser() user: MeSession): Promise<MeSession | null> {
    return user;
  }

  @Query(() => [UserDto])
  async allUsers(): Promise<UserEntity[]> {
    return this.userService.find();
  }
}
