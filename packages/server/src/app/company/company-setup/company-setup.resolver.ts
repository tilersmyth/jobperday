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
import { UserEntity } from '../../user/entity';
import { CreateCompanyInput } from './inputs/create-company.input';
import { UpdateCompanyInput } from '../inputs/update-company.input';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CreateCompanyProfileDto } from './dto/create-company-profile.dto';
import { CreateCompanyProfileInput } from '../inputs/create-company-profile.input';
import { UpdateCompanyProfileInput } from '../inputs/update-company-profile.input';
import { CompanyMemberDto } from '../dto/company-member.dto';
import { CreateCompanyMembersInput } from './inputs/create-company-members.input';

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
    @Company() company: CompanyEntity,
    @Args('input') input: UpdateCompanyInput,
  ) {
    const updatedCompany = await this.setupService.updateCreateCompany(
      company,
      input,
    );

    this.logger.debug(`[updateCompany] company ${updatedCompany.name} updated`);
    return updatedCompany;
  }

  @Query(() => String)
  async generateCompanySlug(@Args('name') name: string) {
    return this.setupService.generateSlug(name);
  }

  @Query(() => String, { nullable: true })
  async companySlugAvailable(@Args('name') name: string) {
    return this.setupService.slugAvailable(name);
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

  // START STEP 2: CREATE PROFILE

  @Mutation(() => CreateCompanyProfileDto)
  @Role('owner')
  @UseGuards(RolesGuard)
  async createCompanyProfile(
    @Company() company: CompanyEntity,
    @Args('input') input: CreateCompanyProfileInput,
  ) {
    const profile = await this.setupService.createCompanyProfile(
      company,
      input,
    );
    this.logger.debug(
      `[createCompanyProfile] profile created for ${company.name}`,
    );
    return profile;
  }

  @Mutation(() => CreateCompanyProfileDto)
  @Role('owner')
  @UseGuards(RolesGuard)
  async updateCreateCompanyProfile(
    @Args('input') input: UpdateCompanyProfileInput,
  ) {
    const updatedProfile = await this.setupService.updateCreateCompanyProfile(
      input.profile,
    );

    this.logger.debug(
      `[updateCompanyProfile] company profile:  ${updatedProfile.id}`,
    );
    return updatedProfile;
  }

  @Query(() => CreateCompanyProfileDto, { nullable: true })
  @Role('owner')
  @UseGuards(RolesGuard)
  async findCreateCompanyProfile(
    @Company() company: CompanyEntity,
    @Args('input') _: CompanySlugInput,
  ) {
    return this.setupService.findCreateCompanyProfile(company);
  }

  // END STEP 2: CREATE PROFILE

  // START STEP 3: ADD COMPANY MEMBERS

  @Query(() => [CompanyMemberDto])
  @Role('owner')
  @UseGuards(RolesGuard)
  async findCreateCompanyMembers(
    @Company() company: CompanyEntity,
    @Args('input') _: CompanySlugInput,
  ) {
    return this.setupService.findCreateCompanyMembers(company);
  }

  @Mutation(() => Boolean)
  @Role('owner')
  @UseGuards(RolesGuard)
  async createCompanyAddMembers(
    @Company() company: CompanyEntity,
    @Args('input') _: CreateCompanyMembersInput,
  ) {
    await this.setupService.createCompanyAddMembers(company);

    this.logger.debug(
      `[addCompanyMembers] completed setup for:  ${company.name}`,
    );
    return true;
  }

  // END STEP 3: ADD COMPANY MEMBERS
}
