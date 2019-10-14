import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { CompanyAddressEntity, CompanyEntity } from '../entity';
import { COMPANY_ADDRESS_TOKEN } from '../company.constants';
import { CompanyAddressInput } from '../inputs/company-address.input';
import { CrudService } from '../../../base';

@Injectable()
export class CompanyAddressService extends CrudService<CompanyAddressEntity> {
  constructor(
    @Inject(COMPANY_ADDRESS_TOKEN)
    protected readonly repository: Repository<CompanyAddressEntity>,
  ) {
    super();
  }

  public async create(
    company: CompanyEntity,
    input: CompanyAddressInput,
  ): Promise<CompanyAddressEntity> {
    const address = new CompanyAddressEntity();
    Object.assign(address, input);
    address.company = company;
    return this.repository.save(address);
  }
}
