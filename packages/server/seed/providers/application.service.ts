import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import faker from 'faker';
import {
  applicationFieldOptions,
  ApplicationFieldOptions,
} from '@jobperday/common';

import { AppLogger } from '../../src/app';
import { randomNum } from '../utils/randomNum.util';
import {
  APPLICATION_TOKEN,
  APPLICATION_FIELD_TOKEN,
} from '../../src/app/application/application.constants';
import {
  ApplicationEntity,
  ApplicationFieldEntity,
} from '../../src/app/application/entity';
import { CompanyEntity } from '../../src/app/company/entity';

@Injectable()
export class ApplicationSeedService {
  private logger = new AppLogger(ApplicationSeedService.name);

  constructor(
    @Inject(APPLICATION_TOKEN)
    protected readonly appRepository: Repository<ApplicationEntity>,
    @Inject(APPLICATION_FIELD_TOKEN)
    protected readonly appFieldRepository: Repository<ApplicationFieldEntity>,
  ) {}

  private selectFieldType(): ApplicationFieldOptions {
    const optionIndex = randomNum(1, 4);
    return applicationFieldOptions[optionIndex];
  }

  private fieldOptions(type: ApplicationFieldOptions): string[] {
    if (!['radio', 'checkbox'].includes(type)) {
      return [];
    }

    const optionsCount = randomNum(2, 5);

    const options: string[] = [];
    for (let i = 1; i <= optionsCount; i++) {
      options.push(faker.lorem.sentence());
    }

    return options;
  }

  private async createFields(): Promise<ApplicationFieldEntity[]> {
    const fieldCount = randomNum(4, 8);
    const fields: ApplicationFieldEntity[] = [];
    for (let i = 1; i <= fieldCount; i++) {
      const field = new ApplicationFieldEntity();
      field.question = faker.lorem.sentence();
      field.type = this.selectFieldType();
      field.options = this.fieldOptions(field.type);
      const newField = await this.appFieldRepository.save(field);
      fields.push(newField);
    }

    return fields;
  }

  async create(company: CompanyEntity): Promise<ApplicationEntity> {
    const application = new ApplicationEntity();
    application.title = `${company.name}  Application`;
    application.fields = await this.createFields();
    application.companyId = company.id;
    const newApplication = await this.appRepository.save(application);

    this.logger.debug(
      `created ${newApplication.fields.length} question application: ${newApplication.title}`,
    );

    return newApplication;
  }
}
