import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { addressProviders } from './address.providers';
import { AddressService } from './services';

@Module({
  providers: [...addressProviders, AddressService],
  imports: [DatabaseModule],
  exports: [AddressService],
})
export class AddressModule {}
