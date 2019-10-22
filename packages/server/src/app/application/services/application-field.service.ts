import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { CrudService } from '../../../base';
import { ApplicationFieldEntity } from '../entity';
import { ApplicationFieldInput } from '../inputs';

@Injectable()
export class ApplicationFieldService extends CrudService<
  ApplicationFieldEntity
> {
  constructor() {
    super();
  }

  public async create(
    transaction: EntityManager,
    input: ApplicationFieldInput,
  ) {
    const field = new ApplicationFieldEntity();
    Object.assign(field, input);
    return transaction.save(field);
  }
}
