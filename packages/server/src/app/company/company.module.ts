import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CompanyService } from './services/company.service';
import { CompanyMemberService } from './services/company-member.service';
import { companyProviders } from './company.providers';
import { CompanyResolver } from './company.resolver';
import { RolesGuard } from './guards/roles.guard';
import { CompanyAddressService, CompanyProfileService } from './services';

const PROVIDERS = [
  ...companyProviders,
  RolesGuard,
  CompanyService,
  CompanyMemberService,
  CompanyProfileService,
  CompanyAddressService,
];

@Module({
  providers: [...PROVIDERS, CompanyResolver],
  imports: [DatabaseModule],
})
export class CompanyModule {}
