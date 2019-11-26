import { Module, forwardRef } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { companyProfileProviders } from './profile.providers';
import { CompanyProfileService } from './profile.service';
import { UserModule } from '../user/user.module';
import { CompanyProfileResolver } from './profile.resolver';
import { CompanyModule } from '../company/company.module';

const PROVIDERS = [
  ...companyProfileProviders,
  CompanyProfileService,
  CompanyProfileResolver,
];

@Module({
  providers: [...PROVIDERS],
  imports: [UserModule, DatabaseModule, forwardRef(() => CompanyModule)],
  exports: [CompanyProfileService],
})
export class CompanyProfileModule {}
