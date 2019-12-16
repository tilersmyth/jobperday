import { Resolver, Query, Args } from '@nestjs/graphql';

import { UserLocationService } from './location.service';
import { UserLocationDto } from './dto';
import { ClientIp } from './decoraters';

@Resolver('User/Location')
export class UserLocationResolver {
  constructor(private readonly locationService: UserLocationService) {}

  @Query(() => UserLocationDto, { nullable: true })
  async userIpLocation(
    @ClientIp() ip: string,
  ): Promise<UserLocationDto | null> {
    return this.locationService.clientIp(ip);
  }

  @Query(() => UserLocationDto, { nullable: true })
  async userGoogleLocation(
    @Args('address') address: string,
  ): Promise<UserLocationDto | null> {
    return this.locationService.googleApi(address);
  }
}
