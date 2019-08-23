import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { CrudService } from '../../../base';
import { AppLogger } from '../../app.logger';
import { CompanyEntity } from '../entity';
import { COMPANY_TOKEN } from '../company.constants';
import { CreateCompanyInput } from '../inputs/create-company.input';
import { CompanyMemberService } from './company-member.service';
import { UserEntity } from '../../user/entity';
import { CreateCompanyAddressInput } from '../inputs/create-company-address.input';
import { CompanyAddressService } from './company-address.service';
import { CreateCompanyProfileInput } from '../inputs/create-company-profile.input';
import { CompanyProfileService } from './company-profile.service';
import { SlugGeneratorUtil } from '../../_helpers';

@Injectable()
export class CompanyService extends CrudService<CompanyEntity> {
  private logger = new AppLogger(CompanyService.name);

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

  public async create(
    user: UserEntity,
    input: CreateCompanyInput,
  ): Promise<CompanyEntity> {
    const company = new CompanyEntity();
    company.name = input.name;
    company.slug = await this.generateSlug(input.name);
    const savedCompany = await this.repository.save(company);

    this.logger.debug(`[create] company: ${company.name} (${savedCompany.id})`);

    await this.memberService.add({
      userId: user.id,
      company: savedCompany,
      role: 'owner',
      confirmed: true,
    });

    return this.repository.save(company);
  }

  public async createProfile(
    company: CompanyEntity,
    input: CreateCompanyProfileInput,
  ): Promise<boolean> {
    await this.profileService.create(company, input.profile);

    company.setup_stage = company.setup_stage + 1;

    await this.repository.save(company);

    return true;
  }

  public async createAddress(
    company: CompanyEntity,
    input: CreateCompanyAddressInput,
  ): Promise<boolean> {
    const address = await this.addressService.create(input.address);

    const setupStage = company.setup_stage + 1;
    company.setup_stage = setupStage;
    company.setup_complete = setupStage === 2 ? true : false;
    company.address = address;

    await this.repository.save(company);

    return true;
  }
}
