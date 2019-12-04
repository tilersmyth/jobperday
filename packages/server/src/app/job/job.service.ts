import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { CrudService } from '../../base';
import { AppLogger } from '../app.logger';
import { JOB_TOKEN } from './job.constants';
import { JobEntity } from './entity';
import { CompanyEntity } from '../company/entity';
import { JobInput } from './inputs/job.input';
import { UpdateJobInput } from './inputs/update-job.input';
import { ApplicationService } from '../application/services';

@Injectable()
export class JobService extends CrudService<JobEntity> {
  private logger = new AppLogger(JobService.name);

  constructor(
    @Inject(JOB_TOKEN)
    protected readonly repository: Repository<JobEntity>,
    protected appService: ApplicationService,
  ) {
    super();
  }

  public async findAllJobs(company: CompanyEntity): Promise<JobEntity[]> {
    return this.findAll({ where: { company } });
  }

  public async create(
    company: CompanyEntity,
    input: JobInput,
  ): Promise<JobEntity> {
    const job = new JobEntity();
    Object.assign(job, input);
    job.company = company;

    if (input.defaultApplicationId) {
      const application = await this.appService.findOne({
        where: { id: input.defaultApplicationId },
      });

      job.default_application = application;
    }

    return this.repository.save(job);
  }

  public async update(
    company: CompanyEntity,
    input: UpdateJobInput,
  ): Promise<JobEntity> {
    const job = await this.repository.findOne({
      where: { id: input.id, company },
    });
    Object.assign(job, input);

    if (input.defaultApplicationId) {
      const application = await this.appService.findOne({
        where: { id: input.defaultApplicationId },
      });

      job.default_application = application;
    }

    return job.save();
  }
}
