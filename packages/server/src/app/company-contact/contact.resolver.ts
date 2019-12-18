import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { AppLogger } from '../app.logger';
import { UserAuthGuard } from '../auth/guards/user-auth.guard';
import { Company } from '../_helpers';
import { CompanyContactDto } from './dto';
import { CompanyContactService } from './contact.service';
import { CompanyContactInput, UpdateCompanyContactInput } from './inputs';
import { Role } from '../company/roles.decorator';
import { RolesGuard } from '../company/guards/roles.guard';
import { CompanyEntity } from '../company/entity';
import { AddressDto } from '../address';

@UseGuards(UserAuthGuard)
@Resolver('Company/Contact')
export class CompanyContactResolver {
  private logger = new AppLogger(CompanyContactResolver.name);

  constructor(private readonly contactService: CompanyContactService) {}

  /**
   * Find company contact
   */
  @Query(() => CompanyContactDto, { nullable: true })
  @Role('associate')
  @UseGuards(RolesGuard)
  async findCompanyContact(
    @Company() company: CompanyEntity,
    @Args('companySlug') _: string,
  ) {
    return this.contactService.findOne(company);
  }

  @Mutation(() => CompanyContactDto)
  @Role('manager')
  @UseGuards(RolesGuard)
  async createCompanyContact(
    @Company() company: CompanyEntity,
    @Args('input') input: CompanyContactInput,
    @Args('companySlug') _: string,
  ) {
    const contact = await this.contactService.create(company, input);
    this.logger.debug(`[createCompanyContact]: ${company.id}`);
    return contact;
  }

  @Mutation(() => CompanyContactDto)
  @Role('manager')
  @UseGuards(RolesGuard)
  async updateCompanyContact(
    @Company() company: CompanyEntity,
    @Args('input') input: UpdateCompanyContactInput,
    @Args('companySlug') _: string,
  ) {
    const contact = await this.contactService.update(input);
    this.logger.debug(`[updateCompanyContact]: ${company.id}`);
    return contact;
  }

  @Query(() => [AddressDto])
  @Role('manager')
  @UseGuards(RolesGuard)
  async findCompanyAddresses(
    @Company() company: CompanyEntity,
    @Args('companySlug') _: string,
  ) {
    return this.contactService.findAddresses(company);
  }
}
