import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { AppLogger } from '../app.logger';
import { UserAuthGuard } from '../auth/guards/user-auth.guard';
import { User as CurrentUser, Company } from '../_helpers';
import { Role } from './roles.decorator';
import { RolesGuard } from './guards/roles.guard';
import { CompanyEntity } from './entity';
import { CurrentCompanyDto, CreateCompanyDto } from './dto';
import { UserEntity } from '../user/entity';
import { CompanyService } from './company.service';
import { UpdateCompanyInput, CompanyInput } from './inputs';

@UseGuards(UserAuthGuard)
@Resolver('Company')
export class CompanyResolver {
  private logger = new AppLogger(CompanyResolver.name);

  constructor(private readonly companyService: CompanyService) {}

  /**
   * Find current company by slug
   * User must be an associate member or greater
   * (owner is setup is not complete)
   */
  @Query(() => CurrentCompanyDto)
  @Role('associate')
  @UseGuards(RolesGuard)
  async findCompany(
    @Company() company: CompanyEntity,
    @Args('companySlug') _: string,
  ) {
    return company;
  }

  @Mutation(() => CreateCompanyDto)
  async createCompany(
    @CurrentUser() user: UserEntity,
    @Args('input') input: CompanyInput,
  ) {
    const company = await this.companyService.create(user, input);
    this.logger.debug(`[createCompany] company ${company.name} created`);
    return company;
  }

  @Mutation(() => CreateCompanyDto)
  @Role('manager')
  @UseGuards(RolesGuard)
  async updateCompany(
    @Company() company: CompanyEntity,
    @Args('input') input: UpdateCompanyInput,
    @Args('companySlug') _: string,
  ) {
    await this.companyService.update(company, input);
    this.logger.debug(`[updateCompany] updated company: ${company.id}`);
    return company;
  }

  @Query(() => String)
  async generateCompanySlug(@Args('name') name: string) {
    return this.companyService.generateSlug(name);
  }

  @Query(() => String, { nullable: true })
  async findCompanySlug(@Args('name') name: string) {
    return this.companyService.findSlug(name);
  }
}
