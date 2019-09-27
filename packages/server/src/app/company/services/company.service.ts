import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { CrudService } from '../../../base';
import { AppLogger } from '../../app.logger';
import { CompanyEntity } from '../entity';
import { COMPANY_TOKEN } from '../company.constants';
import { CreateCompanyProfileInput } from '../inputs/create-company-profile.input';
import { CompanyProfileService } from './company-profile.service';

@Injectable()
export class CompanyService extends CrudService<CompanyEntity> {
  private logger = new AppLogger(CompanyService.name);

  constructor(
    @Inject(COMPANY_TOKEN)
    protected readonly repository: Repository<CompanyEntity>,
    private readonly profileService: CompanyProfileService,
  ) {
    super();
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
}
