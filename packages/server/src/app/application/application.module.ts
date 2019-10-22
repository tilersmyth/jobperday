import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { applicationProviders } from './application.providers';
import { UserModule } from '../user/user.module';
import { ApplicationService, ApplicationFieldService } from './services';
import { ApplicationResolver } from './application.resolver';
import { CompanyModule } from '../company/company.module';

const PROVIDERS = [
  ...applicationProviders,
  ApplicationService,
  ApplicationFieldService,
  ApplicationResolver,
];

@Module({
  providers: [...PROVIDERS],
  imports: [DatabaseModule, UserModule, CompanyModule],
})
export class ApplicationModule {}
