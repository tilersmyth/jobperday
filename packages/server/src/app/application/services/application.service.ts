import { Injectable, Inject } from '@nestjs/common';
import { getManager, Repository } from 'typeorm';

import { CrudService } from '../../../base';
import { AppLogger } from '../../app.logger';
import { ApplicationEntity } from '../entity';
import { ApplicationInput } from '../inputs';
import { ApplicationFieldService } from './application-field.service';
import { APPLICATION_TOKEN } from '../application.constants';

@Injectable()
export class ApplicationService extends CrudService<ApplicationEntity> {
  private logger = new AppLogger(ApplicationService.name);

  constructor(
    @Inject(APPLICATION_TOKEN)
    protected readonly repository: Repository<ApplicationEntity>,
    protected fieldService: ApplicationFieldService,
  ) {
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

  public async findById(id: string) {
    return this.repository
      .createQueryBuilder('application')
      .innerJoinAndSelect('application.fields', 'fields')
      .where('application.id = :id', { id })
      .getOne();
  }
}
