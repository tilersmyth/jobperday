import { Injectable, Inject } from '@nestjs/common';
import { Repository, EntityManager } from 'typeorm';

import { CrudService } from '../../../base';
import { AppLogger } from '../../app.logger';
import { AddressEntity } from '../entity';
import { ADDRESS_TOKEN } from '../address.constants';
import { AddressRefTypeEnum } from '../enums';
import { AddressInput } from '../inputs';

@Injectable()
export class AddressService extends CrudService<AddressEntity> {
  private logger = new AppLogger(AddressService.name);

  constructor(
    @Inject(ADDRESS_TOKEN)
    protected readonly repository: Repository<AddressEntity>,
  ) {
    super();
  }

  public async create(
    refId: string,
    refType: AddressRefTypeEnum,
    input: AddressInput,
    transaction?: EntityManager,
  ): Promise<AddressEntity> {
    const address = new AddressEntity();
    Object.assign(address, { ...input, refId, refType });

    if (transaction) {
      return transaction.save(address);
    }

    return this.repository.save(address);
  }
}
