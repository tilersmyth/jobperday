import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { GraphqlGuard, User as CurrentUser } from '../_helpers';
import { UserEntity } from '../user/entity';
import { CompanyService } from './services';
import { AppLogger } from '../app.logger';
import { CompanyDto } from './dto/company.dto';
import { CreateCompanyInput } from './inputs/create-company.input';
import { CreateCompanyAddressInput } from './inputs/create-company-address.input';
import { Role } from './roles.decorator';
import { RolesGuard } from './guards/roles.guard';
import { CreateCompanyProfileInput } from './inputs/create-company-profile.input';

@UseGuards(GraphqlGuard)
@Resolver('Company')
export class CompanyResolver {
  private logger = new AppLogger(CompanyResolver.name);

  constructor(private readonly companyService: CompanyService) {}

  @Mutation(() => CompanyDto)
  async createCompany(
    @CurrentUser() user: UserEntity,
    @Args('input') input: CreateCompanyInput,
  ) {
    const company = await this.companyService.create(user, input);
    this.logger.debug(`[createCompany] company ${company.name} created`);
    return company;
  }

  @Mutation(() => Boolean)
  @Role('admin')
  @UseGuards(RolesGuard)
  async createCompanyProfile(@Args('input') input: CreateCompanyProfileInput) {
    await this.companyService.createProfile(input);
    this.logger.debug(`[createCompanyProfile] profile created`);
    return true;
  }

  @Mutation(() => Boolean)
  @Role('admin')
  @UseGuards(RolesGuard)
  async createCompanyAddress(@Args('input') input: CreateCompanyAddressInput) {
    await this.companyService.createAddress(input);
    this.logger.debug(`[createCompanyAddress] address created`);
    return true;
  }
}
