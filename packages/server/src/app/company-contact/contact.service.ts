import { Injectable, Inject } from '@nestjs/common';
import { Repository, getManager } from 'typeorm';

import { AppLogger } from '../app.logger';
import { CrudService } from '../../base';
import { CompanyContactEntity } from './entity';
import { COMPANY_CONTACT_TOKEN } from './contact.constants';
import { CompanyEntity } from '../company/entity';
import { CompanyContactInput, UpdateCompanyContactInput } from './inputs';
import { AddressService, AddressRefTypeEnum, AddressEntity } from '../address';

@Injectable()
export class CompanyContactService extends CrudService<CompanyContactEntity> {
  private logger = new AppLogger(CompanyContactService.name);

  constructor(
    @Inject(COMPANY_CONTACT_TOKEN)
    protected readonly repository: Repository<CompanyContactEntity>,
    private readonly addressService: AddressService,
  ) {
    super();
  }

  public async create(
    company: CompanyEntity,
    input: CompanyContactInput,
  ): Promise<CompanyContactEntity> {
    return getManager().transaction(async transaction => {
      company.setup_stage = company.setup_stage + 1;
      await transaction.save(company);

      const contact = new CompanyContactEntity();
      contact.phone = input.phone;
      contact.address = await this.addressService.create(
        company.id,
        AddressRefTypeEnum.COMPANY,
        input.address,
        transaction,
      );
      contact.company = company;

      return transaction.save(contact);
    });
  }

  public async update(
    input: UpdateCompanyContactInput,
  ): Promise<CompanyContactEntity> {
    return getManager().transaction(async transaction => {
      const { id: contactId, address, ...contactUdpates } = input;
      let contact = await transaction.findOne(CompanyContactEntity, {
        id: contactId,
      });

      if (contactUdpates) {
        Object.assign(contact, contactUdpates);
        contact = await transaction.save(contact);
      }

      const { id: addressId, ...addressUpdates } = address;
      const contactAddress = await transaction.findOne(AddressEntity, {
        id: addressId,
      });

      if (addressUpdates) {
        Object.assign(contactAddress, addressUpdates);
        contact.address = await transaction.save(contactAddress);
      }

      return contact;
    });
  }
}
