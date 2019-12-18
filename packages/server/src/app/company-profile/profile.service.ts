import { Injectable, Inject } from '@nestjs/common';
import { Repository, getManager } from 'typeorm';

import { CompanyService } from '../company/company.service';
import { config } from '../../config';
import { AppLogger } from '../app.logger';
import { CompanyProfileEntity } from './entity';
import { COMPANY_PROFILE_TOKEN } from './profile.constants';
import { CompanyEntity } from '../company/entity';
import { CompanyProfileInput, UpdateCompanyProfileInput } from './inputs';

@Injectable()
export class CompanyProfileService {
  private logger = new AppLogger(CompanyProfileService.name);

  constructor(
    @Inject(COMPANY_PROFILE_TOKEN)
    protected readonly repository: Repository<CompanyProfileEntity>,
    protected readonly companyService: CompanyService,
  ) {}

  public async create(
    company: CompanyEntity,
    input: CompanyProfileInput,
  ): Promise<CompanyProfileEntity> {
    return getManager().transaction(async transaction => {
      const profile = new CompanyProfileEntity();

      if (config.env !== 'production') {
        (profile.cover_image =
          'https://jobperday-dev.s3.amazonaws.com/companies/stock/stock_cover.jpg'),
          (profile.profile_image =
            'https://jobperday-dev.s3.amazonaws.com/companies/stock/stock_profile.png');
      }

      Object.assign(profile, input);
      const savedProfile = await transaction.save(profile);

      company.setup_stage = company.setup_stage + 1;
      company.profile = savedProfile;
      await transaction.save(company);

      return savedProfile;
    });
  }

  public async update(
    input: UpdateCompanyProfileInput,
  ): Promise<CompanyProfileEntity> {
    const profile = await this.repository.findOne({ where: { id: input.id } });
    Object.assign(profile, input);
    return this.repository.save(profile);
  }

  public async findOne(
    company: CompanyEntity,
  ): Promise<CompanyProfileEntity | null> {
    return this.companyService.findProfile(company.id);
  }
}
