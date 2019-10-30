import { Module } from '@nestjs/common';

import { imageProviders } from './image.providers';
import { DatabaseModule } from '../../database/database.module';
import { CompanyImageService } from './image.service';
import { CompanyImageResolver } from './image.resolver';
import { RolesGuard } from '../guards/roles.guard';
import { UserModule } from '../../user/user.module';
import { CompanyModule } from '../company.module';
import { UploadScalar } from '../../_helpers/scalars/upload.scalar';
import { AWSS3Service } from '../../_helpers';

const PROVIDERS = [
  ...imageProviders,
  RolesGuard,
  CompanyImageService,
  CompanyImageResolver,
  UploadScalar,
  AWSS3Service,
];

@Module({
  providers: [...PROVIDERS],
  imports: [DatabaseModule, UserModule, CompanyModule],
})
export class CompanyImageModule {}
