import { Resolver, Query, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { UserAuthGuard } from '../../auth/guards/user-auth.guard';
import { User as CurrentUser, Company } from '../../_helpers';
import { UserEntity } from '../../user/entity';
import { AppLogger } from '../../app.logger';
import { FindCompanyService } from './find-company.service';
import { Role } from '../roles.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { CompanyEntity } from '../entity';
import { MemberCompanyDto } from './dto/member-company.dto';
import { EmployerCompanyDto } from './dto/employer-company.dto';

@UseGuards(UserAuthGuard)
@Resolver('FindCompany')
export class FindCompanyResolver {
  private logger = new AppLogger(FindCompanyResolver.name);

  constructor(private readonly findService: FindCompanyService) {}

  @Query(() => [MemberCompanyDto])
  async findEmployerCompanies(@CurrentUser() user: UserEntity) {
    const employerCompanies = await this.findService.findAll(user);
    this.logger.debug(
      `[findEmployerCompabies] found ${employerCompanies.length} companies for ${user.email}`,
    );
    return employerCompanies;
  }

  @Query(() => EmployerCompanyDto)
  @Role('associate')
  @UseGuards(RolesGuard)
  async findEmployerCompany(
    @CurrentUser() user: UserEntity,
    @Company() company: CompanyEntity,
    @Args('companySlug') _: string,
  ) {
    return this.findService.findOne(user, company);
  }
}
