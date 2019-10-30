import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';

import { ApplicationService } from './services';
import { UseGuards } from '@nestjs/common';
import { UserAuthGuard } from '../auth/guards/user-auth.guard';
import { AppLogger } from '../app.logger';
import { Role } from '../company/roles.decorator';
import { Company } from '../_helpers';
import { CompanyEntity } from '../company/entity';
import { ApplicationInput } from './inputs';
import { RolesGuard } from '../company/guards/roles.guard';
import { ApplicationDto } from './dto';

@UseGuards(UserAuthGuard)
@Resolver('Application')
export class ApplicationResolver {
  private logger = new AppLogger(ApplicationResolver.name);

  constructor(private readonly appService: ApplicationService) {}

  @Mutation(() => ApplicationDto)
  @Role('manager')
  @UseGuards(RolesGuard)
  async createApplication(
    @Company() company: CompanyEntity,
    @Args('companySlug') _: string,
    @Args('input') input: ApplicationInput,
  ) {
    const app = await this.appService.create(company.id, input);
    this.logger.debug(`[createApplication] created app: ${app.title}`);
    return app;
  }

  @Query(() => [ApplicationDto])
  @Role('manager')
  @UseGuards(RolesGuard)
  async findAllApplications(
    @Company() company: CompanyEntity,
    @Args('companySlug') _: string,
  ) {
    return this.appService.findAll({ where: { companyId: company.id } });
  }
}
