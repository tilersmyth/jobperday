import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { companyProviders } from './company.providers';
import { CompanyResolver } from './company.resolver';
import { RolesGuard } from './guards/roles.guard';
import { UserModule } from '../user/user.module';
import { CompanyService } from './company.service';
import { CompanyContactModule } from '../company-contact';
import { CompanyMemberModule } from '../company-member';
import { CompanySlugValidator } from './entity';
import { CompanyProfileModule } from '../company-profile';

const PROVIDERS = [
  ...companyProviders,
  CompanyService,
  RolesGuard,
  CompanySlugValidator,
  CompanyResolver,
];

@Module({
  providers: [...PROVIDERS],
  imports: [
    UserModule,
    DatabaseModule,
    CompanyProfileModule,
    CompanyContactModule,
    CompanyMemberModule,
  ],
  exports: [CompanyService, RolesGuard],
})
export class CompanyModule {}
