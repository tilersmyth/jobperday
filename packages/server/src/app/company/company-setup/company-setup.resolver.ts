import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { User as CurrentUser, Company } from '../../_helpers';
import { AppLogger } from '../../app.logger';
import { Role } from '../roles.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { CompanyEntity } from '../entity';
import { UserAuthGuard } from '../../auth/guards/user-auth.guard';
import { CompanySlugInput } from './inputs/company-slug.input';
import { CompanySetupService } from './company-setup.service';
import { CompanyDto } from '../dto/company.dto';
import { CompanyAddressDto } from '../dto/company-address.dto';
import { UserEntity } from '../../user/entity';
import { CreateCompanyInput } from './inputs/create-company.input';
import { UpdateCompanyInput } from '../inputs/update-company.input';
import { CreateCompanyDto } from './dto/create-company.dto';

@UseGuards(UserAuthGuard)
@Resolver('Company')
export class CompanySetupResolver {
  private logger = new AppLogger(CompanySetupResolver.name);

  constructor(private readonly setupService: CompanySetupService) {}

  @Query(() => CompanyDto)
  @Role('owner')
  @UseGuards(RolesGuard)
  async findCompany(
    @Company() company: CompanyEntity,
    @Args('input') _: CompanySlugInput,
  ) {
    return company;
  }

  // START STEP 1: CREATE COMPANY
  @Mutation(() => CreateCompanyDto)
  async createCompany(
    @CurrentUser() user: UserEntity,
    @Args('input') input: CreateCompanyInput,
  ) {
    const company = await this.setupService.createCompany(user, input);
    this.logger.debug(`[createCompany] company ${company.name} created`);
    return company;
  }

  @Mutation(() => CreateCompanyDto)
  @Role('owner')
  @UseGuards(RolesGuard)
  async updateCreateCompany(
    @CurrentUser() user: UserEntity,
    @Company() company: CompanyEntity,
    @Args('input') input: UpdateCompanyInput,
  ) {
    const updatedCompany = await this.setupService.updateCreateCompany(
      user,
      company,
      input,
    );

    this.logger.debug(`[updateCompany] company ${updatedCompany.name} updated`);
    return updatedCompany;
  }

  @Query(() => CreateCompanyDto)
  @Role('owner')
  @UseGuards(RolesGuard)
  async findCreateCompany(
    @Company() company: CompanyEntity,
    @Args('input') _: CompanySlugInput,
  ) {
    return this.setupService.findCreateCompany(company);
  }
  // END STEP 1: CREATE COMPANY
}
