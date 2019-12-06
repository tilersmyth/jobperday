import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { applicantProviders } from './applicant.providers';
import { UserModule } from '../user/user.module';
import { ApplicantService, ApplicantAnswerService } from './services';
import { ApplicantResolver } from './applicant.resolver';
import { CompanyModule } from '../company/company.module';

const PROVIDERS = [
  ...applicantProviders,
  ApplicantService,
  ApplicantAnswerService,
  ApplicantResolver,
];

@Module({
  providers: [...PROVIDERS],
  imports: [DatabaseModule, UserModule, CompanyModule],
})
export class ApplicantModule {}
