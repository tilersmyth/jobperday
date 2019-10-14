import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { CrudService } from '../../../base';
import { AppLogger } from '../../app.logger';
import { CompanyEntity, CompanyAddressEntity } from '../entity';
import { COMPANY_TOKEN } from '../company.constants';
import { CompanyAddressService } from './company-address.service';
import { CompanyAddressInput } from '../inputs/company-address.input';

@Injectable()
export class CompanyService extends CrudService<CompanyEntity> {
  private logger = new AppLogger(CompanyService.name);

  constructor(
    @Inject(COMPANY_TOKEN)
    protected readonly repository: Repository<CompanyEntity>,
    private readonly addressService: CompanyAddressService,
  ) {
    super();
  }

  public async findOneCompanyAddress(
    addressId: string,
  ): Promise<CompanyAddressEntity> {
    return this.addressService.findOneById(addressId);
  }

  public async findAllCompanyAddresses(
    company: CompanyEntity,
  ): Promise<CompanyAddressEntity[]> {
    return this.addressService.findAll({ where: { company } });
  }

  public async createCompanyAddress(
    company: CompanyEntity,
    address: CompanyAddressInput,
  ): Promise<CompanyAddressEntity> {
    return this.addressService.create(company, address);
  }
}
