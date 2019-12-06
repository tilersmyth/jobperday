import { Resolver, Query } from '@nestjs/graphql';

import { UserDto } from './dto/user.dto';
import { UserEntity } from './entity';
import { User as CurrentUser } from '../_helpers';
import { UserService } from './user.service';
import { MeSession } from './interfaces/me-session.interface';
import { MeSessionDto } from './dto/session/me.dto';
import { Location } from './location/location.decorator';
import { SearchLocation } from '../search/interfaces/search-location.interface';
import { SessionLocationDto } from './dto/session/location.dto';

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

  @Query(() => SessionLocationDto, { nullable: true })
  async userLocation(@Location() ip: string): Promise<SearchLocation | null> {
    return this.userService.findUserLocation(ip);
  }
}
