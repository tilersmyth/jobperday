import { Module, forwardRef } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { companyContactProviders } from './contact.providers';
import { AddressModule } from '../address';
import { CompanyContactService } from './contact.service';
import { UserModule } from '../user/user.module';
import { CompanyContactResolver } from './contact.resolver';
import { CompanyModule } from '../company/company.module';

const PROVIDERS = [
  ...companyContactProviders,
  CompanyContactService,
  CompanyContactResolver,
];

@Module({
  providers: [...PROVIDERS],
  imports: [
    UserModule,
    DatabaseModule,
    AddressModule,
    forwardRef(() => CompanyModule),
  ],
})
export class CompanyContactModule {}
