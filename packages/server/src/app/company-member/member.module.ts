import { Module, forwardRef } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { companyMemberProviders } from './member.providers';
import { UserModule } from '../user/user.module';
import { CompanyModule } from '../company/company.module';
import { CompanyMemberService } from './member.service';
import { CompanyMemberResolver } from './member.resolver';

const PROVIDERS = [
  ...companyMemberProviders,
  CompanyMemberService,
  CompanyMemberResolver,
];

@Module({
  providers: [...PROVIDERS],
  imports: [UserModule, DatabaseModule, forwardRef(() => CompanyModule)],
  exports: [CompanyMemberService],
})
export class CompanyMemberModule {}
