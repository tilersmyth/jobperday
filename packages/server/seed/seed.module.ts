import { Module } from '@nestjs/common';

import { DatabaseModule } from '../src/app/database/database.module';
import { SeedService } from './seed.service';
import { UserSeedService } from './providers/user.service';
import { userProviders } from '../src/app/user/user.providers';
import { companyProviders } from '../src/app/company/company.providers';
import { SeedDBService } from './providers/db.service';
import { CompanySeedService } from './providers/company.service';
import { CompanyMemberService } from '../src/app/company/services';
import { jobProviders } from '../src/app/job/job.providers';
import { JobSeedService } from './providers/job.service';
import { JobPostingSeedService } from './providers/job-posting.service';

const PROVIDERS = [
  ...userProviders,
  ...companyProviders,
  ...jobProviders,
  SeedDBService,
  SeedService,
  UserSeedService,
  CompanySeedService,
  CompanyMemberService,
  JobSeedService,
  JobPostingSeedService,
];

@Module({
  imports: [DatabaseModule],
  providers: [...PROVIDERS],
})
export class SeederModule {}
