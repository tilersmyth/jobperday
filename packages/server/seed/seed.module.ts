import { Module } from '@nestjs/common';

import { DatabaseModule } from '../src/app/database/database.module';
import { SeedService } from './seed.service';
import { UserSeedService } from './providers/user.service';
import { userProviders } from '../src/app/user/user.providers';
import { companyProviders } from '../src/app/company/company.providers';
import { SeedDBService } from './providers/db.service';
import { CompanySeedService } from './providers/company.service';
import { jobProviders } from '../src/app/job/job.providers';
import { JobSeedService } from './providers/job.service';
import { JobPostingSeedService } from './providers/job-posting.service';
import { ApplicationSeedService } from './providers/application.service';
import { applicationProviders } from '../src/app/application/application.providers';
import { CompanyModule } from '../src/app/company/company.module';
import { CompanyMemberModule } from '../src/app/company-member/member.module';
import { AddressModule } from '../src/app/address/address.module';
import { CompanyProfileModule } from '../src/app/company-profile/profile.module';
import { jobPostingProviders } from 'server/src/app/job-posting/posting.providers';

const PROVIDERS = [
  ...userProviders,
  ...companyProviders,
  ...jobProviders,
  ...jobPostingProviders,
  ...applicationProviders,
  SeedDBService,
  SeedService,
  UserSeedService,
  CompanySeedService,
  JobSeedService,
  JobPostingSeedService,
  ApplicationSeedService,
];

@Module({
  imports: [
    DatabaseModule,
    CompanyModule,
    CompanyMemberModule,
    CompanyProfileModule,
    AddressModule,
  ],
  providers: [...PROVIDERS],
})
export class SeederModule {}
