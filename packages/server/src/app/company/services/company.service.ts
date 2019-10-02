import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { CrudService } from '../../../base';
import { AppLogger } from '../../app.logger';
import { CompanyEntity } from '../entity';
import { COMPANY_TOKEN } from '../company.constants';
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
}
