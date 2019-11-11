import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { AppLogger } from '../app.logger';
import { UserAuthGuard } from '../auth/guards/user-auth.guard';
import { User as CurrentUser, Company } from '../_helpers';
import { CompanyMemberService } from './member.service';
import { UserEntity } from '../user/entity';
import { MemberCompanyDto, CompanyMemberDto } from './dto';
import { CompanyMemberInput } from './inputs';
import { Role } from '../company/roles.decorator';
import { RolesGuard } from '../company/guards/roles.guard';
import { CompanyEntity } from '../company/entity';

@UseGuards(UserAuthGuard)
@Resolver('Company/Member')
export class CompanyMemberResolver {
  private logger = new AppLogger(CompanyMemberResolver.name);

  constructor(private readonly memberService: CompanyMemberService) {}

  /**
   * Find all companies where user is listed as member
   */
  @Query(() => [MemberCompanyDto])
  async findCompanies(@CurrentUser() user: UserEntity) {
    const employerCompanies = await this.memberService.findAllCompanies(user);
    this.logger.debug(
      `[findEmployerCompanies] found ${employerCompanies.length} companies for ${user.email}`,
    );
    return employerCompanies;
  }

  /**
   * Find all members
   */
  @Query(() => [CompanyMemberDto])
  @Role('manager')
  @UseGuards(RolesGuard)
  async findCompanyMembers(
    @Company() company: CompanyEntity,
    @Args('companySlug') _: string,
  ) {
    return this.memberService.findAll({
      where: {
        company,
      },
      relations: ['user'],
    });
  }

  @Mutation(() => [CompanyMemberDto])
  @Role('manager')
  @UseGuards(RolesGuard)
  async createCompanyMembers(
    @Company() company: CompanyEntity,
    @Args({ name: 'input', type: () => [CompanyMemberInput] })
    input: CompanyMemberInput[],
    @Args('companySlug') _: string,
  ) {
    const contact = await this.memberService.create(company, input);
    this.logger.debug(`[addCompanyMembers]: ${company.id}`);
    return contact;
  }
}
