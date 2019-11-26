import { Injectable, Inject } from '@nestjs/common';
import { Repository, getManager } from 'typeorm';

import { AppLogger } from '../app.logger';
import { CrudService } from '../../base';
import { CompanyProfileEntity } from './entity';
import { COMPANY_PROFILE_TOKEN } from './profile.constants';
import { CompanyEntity } from '../company/entity';
import { CompanyProfileInput, UpdateCompanyProfileInput } from './inputs';

@Injectable()
export class CompanyProfileService extends CrudService<CompanyProfileEntity> {
  private logger = new AppLogger(CompanyProfileService.name);

  constructor(
    @Inject(COMPANY_PROFILE_TOKEN)
    protected readonly repository: Repository<CompanyProfileEntity>,
  ) {
    super();
  }

  public async create(
    // company: CompanyEntity,
    input: CompanyProfileInput,
  ): Promise<CompanyProfileEntity> {
    return getManager().transaction(async transaction => {
      // company.setup_stage = company.setup_stage + 1;
      // await transaction.save(company);

      const profile = new CompanyProfileEntity();
      Object.assign(profile, input);
      // profile.company = company;
      return transaction.save(profile);
    });
  }

  public async update(
    input: UpdateCompanyProfileInput,
  ): Promise<CompanyProfileEntity> {
    const profile = await this.repository.findOne({ where: { id: input.id } });
    Object.assign(profile, input);
    return this.repository.save(profile);
  }
}
