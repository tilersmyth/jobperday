import { Injectable } from '@nestjs/common';
import { getManager } from 'typeorm';

import { CrudService } from '../../../base';
import { AppLogger } from '../../app.logger';
import { ApplicationEntity } from '../entity';
import { ApplicationInput } from '../inputs';
import { ApplicationFieldService } from './application-field.service';

@Injectable()
export class ApplicationService extends CrudService<ApplicationEntity> {
  private logger = new AppLogger(ApplicationService.name);

  constructor(protected fieldService: ApplicationFieldService) {
    super();
  }

  public async create(companyId: string, input: ApplicationInput) {
    return getManager().transaction(async transaction => {
      const application = new ApplicationEntity();

      application.title = input.title;
      application.fields = await Promise.all(
        input.fields.map(field => this.fieldService.create(transaction, field)),
      );
      application.companyId = companyId;

      return transaction.save(application);
    });
  }
}
