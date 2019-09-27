import { Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { CompanyService } from './services';
import { AppLogger } from '../app.logger';
import { UserAuthGuard } from '../auth/guards/user-auth.guard';

@UseGuards(UserAuthGuard)
@Resolver('Company')
export class CompanyResolver {
  private logger = new AppLogger(CompanyResolver.name);

  constructor(private readonly companyService: CompanyService) {}
}
