import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { GraphqlGuard, User as CurrentUser, Company } from '../_helpers';
import { UserEntity } from '../user/entity';
import { CompanyService } from './services';
import { AppLogger } from '../app.logger';
import { CompanyDto } from './dto/company.dto';
import { CreateCompanyInput } from './inputs/create-company.input';
import { CreateCompanyAddressInput } from './inputs/create-company-address.input';
import { Role } from './roles.decorator';
import { RolesGuard } from './guards/roles.guard';
import { CreateCompanyProfileInput } from './inputs/create-company-profile.input';
import { CompanyEntity } from './entity';

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
  async createCompanyProfile(
    @Company() company: CompanyEntity,
    @Args('input') input: CreateCompanyProfileInput,
  ) {
    await this.companyService.createProfile(company, input);
    this.logger.debug(`[createCompanyProfile] profile created`);
    return true;
  }

  @Mutation(() => Boolean)
  @Role('admin')
  @UseGuards(RolesGuard)
  async createCompanyAddress(
    @Company() company: CompanyEntity,
    @Args('input') input: CreateCompanyAddressInput,
  ) {
    await this.companyService.createAddress(company, input);
    this.logger.debug(`[createCompanyAddress] address created`);
    return true;
  }
}
