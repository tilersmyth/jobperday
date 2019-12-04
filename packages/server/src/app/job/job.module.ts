import { Module } from '@nestjs/common';

import { jobProviders } from './job.providers';
import { DatabaseModule } from '../database/database.module';
import { JobResolver } from './job.resolver';
import { JobService } from './job.service';
import { CompanyModule } from '../company/company.module';
import { UserModule } from '../user/user.module';
import { ApplicationModule } from '../application/application.module';
import { JobPostingModule } from '../job-posting/posting.module';

const PROVIDERS = [...jobProviders, JobService, JobResolver];

@Module({
  providers: [...PROVIDERS],
  imports: [
    DatabaseModule,
    UserModule,
    CompanyModule,
    JobPostingModule,
    ApplicationModule,
  ],
  exports: [JobService],
})
export class JobModule {}
