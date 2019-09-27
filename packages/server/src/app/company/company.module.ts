import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CompanyService } from './services/company.service';
import { CompanyMemberService } from './services/company-member.service';
import { companyProviders } from './company.providers';
import { CompanyResolver } from './company.resolver';
import { RolesGuard } from './guards/roles.guard';
import { CompanyAddressService, CompanyProfileService } from './services';
import { UserModule } from '../user/user.module';
import { CompanySetupResolver, CompanySetupService } from './company-setup';

const PROVIDERS = [
  ...companyProviders,
  RolesGuard,
  CompanyService,
  CompanyMemberService,
  CompanyProfileService,
  CompanyAddressService,
  CompanyResolver,
  CompanySetupService,
  CompanySetupResolver,
];

@Module({
  providers: [...PROVIDERS],
  imports: [UserModule, DatabaseModule],
  exports: [CompanyService],
})
export class CompanyModule {}
