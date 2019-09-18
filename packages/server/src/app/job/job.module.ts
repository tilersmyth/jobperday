import { Module } from '@nestjs/common';

import { jobProviders } from './job.providers';
import { DatabaseModule } from '../database/database.module';
import { JobResolver } from './job.resolver';
import { JobService, JobInstanceService } from './services';
import { CompanyModule } from '../company/company.module';
import { UserModule } from '../user/user.module';

const PROVIDERS = [
  ...jobProviders,
  JobService,
  JobInstanceService,
  JobResolver,
];

@Module({
  providers: [...PROVIDERS, JobService, JobInstanceService, JobResolver],
  imports: [DatabaseModule, UserModule, CompanyModule],
})
export class JobModule {}
