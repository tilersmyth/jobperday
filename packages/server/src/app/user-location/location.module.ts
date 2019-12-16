import { Module } from '@nestjs/common';

import { UserLocationResolver } from './location.resolver';
import { UserLocationService } from './location.service';

@Module({
  providers: [UserLocationResolver, UserLocationService],
})
export class UserLocationModule {}
