import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { AppLogger } from '../app.logger';
import { UserAuthGuard } from '../auth/guards/user-auth.guard';
import { Company } from '../_helpers';
import { CompanyProfileDto } from './dto';
import { CompanyProfileInput, UpdateCompanyProfileInput } from './inputs';
import { CompanyProfileService } from './profile.service';
import { Role } from '../company/roles.decorator';
import { RolesGuard } from '../company/guards/roles.guard';
import { CompanyEntity } from '../company/entity';

@UseGuards(UserAuthGuard)
@Resolver('Company/Profile')
export class CompanyProfileResolver {
  private logger = new AppLogger(CompanyProfileResolver.name);

  constructor(private readonly profileService: CompanyProfileService) {}

  /**
   * Find company profile
   */
  @Query(() => CompanyProfileDto, { nullable: true })
  @Role('associate')
  @UseGuards(RolesGuard)
  async findCompanyProfile(
    @Company() company: CompanyEntity,
    @Args('companySlug') _: string,
  ) {
    return this.profileService.findOne({
      where: { company },
    });
  }

  @Mutation(() => CompanyProfileDto)
  @Role('manager')
  @UseGuards(RolesGuard)
  async createCompanyProfile(
    @Company() company: CompanyEntity,
    @Args('input') input: CompanyProfileInput,
    @Args('companySlug') _: string,
  ) {
    const profile = await this.profileService.create(company, input);
    this.logger.debug(`[createCompanyProfile]: ${company.id}`);
    return profile;
  }

  @Mutation(() => CompanyProfileDto)
  @Role('manager')
  @UseGuards(RolesGuard)
  async updateCompanyProfile(
    @Company() company: CompanyEntity,
    @Args('input') input: UpdateCompanyProfileInput,
    @Args('companySlug') _: string,
  ) {
    const profile = await this.profileService.update(input);
    this.logger.debug(`[updateCompanyProfile]: ${company.id}`);
    return profile;
  }
}
