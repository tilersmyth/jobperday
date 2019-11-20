import { Module } from '@nestjs/common';

import { jobProviders } from './job.providers';
import { DatabaseModule } from '../database/database.module';
import { JobResolver } from './job.resolver';
import { JobService, JobPostingService } from './services';
import { CompanyModule } from '../company/company.module';
import { UserModule } from '../user/user.module';
import { ApplicationModule } from '../application/application.module';
import { AddressModule } from '../address/address.module';

const PROVIDERS = [...jobProviders, JobService, JobPostingService, JobResolver];

@Module({
  providers: [...PROVIDERS],
  imports: [
    DatabaseModule,
    UserModule,
    CompanyModule,
    ApplicationModule,
    AddressModule,
  ],
})
export class JobModule {}
