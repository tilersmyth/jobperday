import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { CompanyProfileEntity, CompanyEntity } from '../entity';
import { COMPANY_PROFILE_TOKEN } from '../company.constants';
import { CompanyProfileInput } from '../inputs/company-profile.input';

@Injectable()
export class CompanyProfileService {
  constructor(
    @Inject(COMPANY_PROFILE_TOKEN)
    protected readonly repository: Repository<CompanyProfileEntity>,
  ) {}

  public async create(
    company: CompanyEntity,
    input: CompanyProfileInput,
  ): Promise<CompanyProfileEntity> {
    const profile = new CompanyProfileEntity();
    profile.profile_image = input.profile_image;
    profile.cover_image = input.cover_image;
    profile.about = input.about;
    profile.business_type = input.business_type;
    profile.company = company;

    return this.repository.save(profile);
  }
}
