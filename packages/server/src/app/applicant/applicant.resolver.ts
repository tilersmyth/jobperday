import { Resolver, Mutation, Args } from '@nestjs/graphql';

import { ApplicantService } from './services';
import { UseGuards } from '@nestjs/common';
import { UserAuthGuard } from '../auth/guards/user-auth.guard';
import { AppLogger } from '../app.logger';
import { User as CurrentUser, Company } from '../_helpers';
import { CompanyEntity } from '../company/entity';
import { CreateApplicantInput } from './inputs';
import { UserEntity } from '../user/entity';
import { ID } from 'type-graphql';

@UseGuards(UserAuthGuard)
@Resolver('Applicant')
export class ApplicantResolver {
  private logger = new AppLogger(ApplicantResolver.name);

  constructor(private readonly applicantService: ApplicantService) {}

  @Mutation(() => Boolean)
  async createApplicant(
    @CurrentUser() user: UserEntity,
    @Args('input') input: CreateApplicantInput,
  ) {
    const applicant = await this.applicantService.create(user, input);
    this.logger.debug(`[createApplicant] created applicant: ${applicant.id}`);
    return true;
  }
}
