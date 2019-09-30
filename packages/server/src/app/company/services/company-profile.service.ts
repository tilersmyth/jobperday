import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { CompanyProfileEntity, CompanyEntity } from '../entity';
import { COMPANY_PROFILE_TOKEN } from '../company.constants';
import { CompanyProfileInput } from '../company-setup/inputs/company-profile.input';
import { CrudService } from '../../../base';

@Injectable()
export class CompanyProfileService extends CrudService<CompanyProfileEntity> {
  constructor(
    @Inject(COMPANY_PROFILE_TOKEN)
    protected readonly repository: Repository<CompanyProfileEntity>,
  ) {
    super();
  }

  public async create(
    company: CompanyEntity,
    input: CompanyProfileInput,
  ): Promise<CompanyProfileEntity> {
    const profile = new CompanyProfileEntity();
    Object.assign(profile, input);
    profile.company = company;
    return this.repository.save(profile);
  }
}
