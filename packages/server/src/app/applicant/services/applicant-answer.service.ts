import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { CrudService } from '../../../base';
import { ApplicantAnswerEntity } from '../entity';
import { CreateApplicantAnswerInput } from '../inputs';
import { ApplicationFieldEntity } from '../../application/entity';

@Injectable()
export class ApplicantAnswerService extends CrudService<ApplicantAnswerEntity> {
  constructor() {
    super();
  }

  public async create(
    input: CreateApplicantAnswerInput,
    transaction: EntityManager,
  ) {
    const field = await transaction.findOne(ApplicationFieldEntity, {
      where: { id: input.fieldId },
    });

    const answer = new ApplicantAnswerEntity();
    answer.response = input.response;
    answer.field = field;
    return transaction.save(answer);
  }
}
