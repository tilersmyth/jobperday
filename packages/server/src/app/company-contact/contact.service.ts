import { Injectable, Inject } from '@nestjs/common';
import { Repository, getManager } from 'typeorm';

import { AppLogger } from '../app.logger';
import { CompanyContactEntity } from './entity';
import { COMPANY_CONTACT_TOKEN } from './contact.constants';
import { CompanyEntity } from '../company/entity';
import { CompanyContactInput, UpdateCompanyContactInput } from './inputs';
import { AddressService, AddressRefTypeEnum, AddressEntity } from '../address';
import { CompanyService } from '../company/company.service';

@Injectable()
export class CompanyContactService {
  private logger = new AppLogger(CompanyContactService.name);

  constructor(
    @Inject(COMPANY_CONTACT_TOKEN)
    protected readonly repository: Repository<CompanyContactEntity>,
    protected readonly companyService: CompanyService,
    private readonly addressService: AddressService,
  ) {}

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

  public async findOne(
    company: CompanyEntity,
  ): Promise<CompanyContactEntity | null> {
    return this.companyService.findContact(company.id);
  }

  public async findAddresses(company: CompanyEntity): Promise<AddressEntity[]> {
    return this.addressService.findAll({
      where: { refId: company.id, refType: AddressRefTypeEnum.COMPANY },
    });
  }
}
