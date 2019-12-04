import { Module, forwardRef } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { JobPostingService } from './posting.service';
import { CompanyModule } from '../company/company.module';
import { UserModule } from '../user/user.module';
import { ApplicationModule } from '../application/application.module';
import { AddressModule } from '../address/address.module';
import { jobPostingProviders } from './posting.providers';
import { JobPostingResolver } from './posting.resolver';
import { JobModule } from '../job/job.module';

const PROVIDERS = [
  ...jobPostingProviders,
  JobPostingService,
  JobPostingResolver,
];

@Module({
  providers: [...PROVIDERS],
  imports: [
    DatabaseModule,
    UserModule,
    CompanyModule,
    forwardRef(() => JobModule),
    ApplicationModule,
    AddressModule,
  ],
})
export class JobPostingModule {}
