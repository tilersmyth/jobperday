import { Module } from '@nestjs/common';

import { jobProviders } from './job.providers';
import { DatabaseModule } from '../database/database.module';
import { JobResolver } from './job.resolver';
import { JobService, JobPostingService } from './services';
import { CompanyModule } from '../company/company.module';
import { UserModule } from '../user/user.module';

const PROVIDERS = [...jobProviders, JobService, JobPostingService, JobResolver];

@Module({
  providers: [...PROVIDERS, JobService, JobResolver],
  imports: [DatabaseModule, UserModule, CompanyModule],
})
export class JobModule {}
