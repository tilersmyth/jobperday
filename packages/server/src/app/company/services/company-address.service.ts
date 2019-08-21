import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { CompanyAddressEntity } from '../entity';
import { COMPANY_ADDRESS_TOKEN } from '../company.constants';
import { AddressInput } from '../../_helpers/inputs/address.input';

@Injectable()
export class CompanyAddressService {
  constructor(
    @Inject(COMPANY_ADDRESS_TOKEN)
    protected readonly repository: Repository<CompanyAddressEntity>,
  ) {}

  public async create(input: AddressInput): Promise<CompanyAddressEntity> {
    const address = new CompanyAddressEntity();
    address.phone = input.phone;
    address.street = input.street;
    address.street2 = input.street2;
    address.city = input.city;
    address.state = input.state;
    address.postal_code = input.postal_code;
    address.country = input.country;

    return this.repository.save(address);
  }
}
