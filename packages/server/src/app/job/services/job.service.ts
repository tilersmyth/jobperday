import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { CrudService } from '../../../base';
import { AppLogger } from '../../app.logger';
import { JOB_TOKEN } from '../job.constants';
import { JobEntity } from '../entity';
import { CreateJobInput } from '../inputs/create-job.input';
import { CompanyEntity } from '../../company/entity';
import { AddJobInstanceInput } from '../inputs/add-job-instance.input';
import { JobInstanceService } from './job-instance.service';

@Injectable()
export class JobService extends CrudService<JobEntity> {
  private logger = new AppLogger(JobService.name);

  constructor(
    @Inject(JOB_TOKEN)
    protected readonly repository: Repository<JobEntity>,
    protected instanceService: JobInstanceService,
  ) {
    super();
  }

  public async create(
    company: CompanyEntity,
    input: CreateJobInput,
  ): Promise<JobEntity> {
    const job = new JobEntity();
    job.name = input.job.name;
    job.category = input.job.category;
    job.summary = input.job.summary;
    job.description = input.job.description;

    job.company = company;

    return this.repository.save(job);
  }

  public async addInstance(input: AddJobInstanceInput): Promise<JobEntity> {
    const job = await this.findOneById(input.jobId);

    const instance = await this.instanceService.add(input.instance);

    job.instances = [instance];

    return this.repository.save(job);
  }
}
