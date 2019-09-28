import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { CrudService } from '../../../base';
import { AppLogger } from '../../app.logger';
import { CompanyEntity } from '../entity';
import { COMPANY_TOKEN } from '../company.constants';
import { CreateCompanyInput } from './inputs/create-company.input';
import { CompanyMemberService } from '../services/company-member.service';
import { UserEntity } from '../../user/entity';
import { CompanyAddressService } from '../services/company-address.service';
import { CompanyProfileService } from '../services/company-profile.service';
import { SlugGeneratorUtil } from '../../_helpers';
import { UpdateCompanyInput } from '../inputs/update-company.input';

@Injectable()
export class CompanySetupService extends CrudService<CompanyEntity> {
  private logger = new AppLogger(CompanySetupService.name);

  constructor(
    @Inject(COMPANY_TOKEN)
    protected readonly repository: Repository<CompanyEntity>,
    private readonly memberService: CompanyMemberService,
    private readonly profileService: CompanyProfileService,
    private readonly addressService: CompanyAddressService,
  ) {
    super();
  }

  public async generateSlug(name: string): Promise<string> {
    const slug = new SlugGeneratorUtil(this.repository);
    return slug.generate(name);
  }

  public async slugAvailable(name: string): Promise<string | null> {
    const slug = new SlugGeneratorUtil(this.repository);
    return slug.available(name);
  }

  public async createCompany(
    user: UserEntity,
    input: CreateCompanyInput,
  ): Promise<CompanyEntity> {
    // Save address
    const address = await this.addressService.create(input.address);

    // Save company
    const company = new CompanyEntity();
    company.name = input.name;
    company.slug = input.slug;
    company.address = address;
    const savedCompany = await this.repository.save(company);

    // Add user as company account owner
    await this.memberService.add({
      user,
      company: savedCompany,
      role: 'owner',
      confirmed: true,
    });

    savedCompany.address = address;

    return savedCompany;
  }

  public async updateCreateCompany(
    user: UserEntity,
    company: CompanyEntity,
    input: UpdateCompanyInput,
  ): Promise<CompanyEntity> {
    // This is the only step where we are actually updating two
    // entities (company, address) so we need to determine which
    // the update applies to

    const { companySlug, ...updates } = input;
    const updateKeys = Object.keys(updates);

    const existingAddress = await this.addressService.findOneById(
      company.addressId,
    );

    if (updateKeys.includes('address')) {
      Object.assign(existingAddress, updates.address);
      const updatedAddress = await existingAddress.save();

      // Reappend updated address to company entity
      company.address = updatedAddress;

      if (updateKeys.length === 1) {
        return company;
      }

      const { address, ...companyUpdates } = updates;
      Object.assign(company, companyUpdates);
      return company.save();
    }

    company.address = existingAddress;

    Object.assign(company, updates);
    return company.save();
  }

  public async findCreateCompany(
    company: CompanyEntity,
  ): Promise<CompanyEntity> {
    return this.repository.findOne(company.id, { relations: ['address'] });
  }
}
