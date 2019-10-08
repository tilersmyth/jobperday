import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { CrudService } from '../../../base';
import { AppLogger } from '../../app.logger';
import { JOB_TOKEN } from '../job.constants';
import { JobEntity, JobInstanceEntity } from '../entity';
import { CompanyEntity } from '../../company/entity';
import { AddJobInstanceInput } from '../inputs/add-job-instance.input';
import { JobInstanceService } from './job-instance.service';
import { SlugGeneratorUtil } from '../../_helpers';
import { AddJobInstanceAddressInput } from '../inputs/add-job-instance-address.input';
import { JobInput } from '../inputs/job.input';

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

  public async generateSlug(
    name: string,
    company: CompanyEntity,
  ): Promise<string> {
    const slug = new SlugGeneratorUtil(this.repository);
    return slug.generate(name, { company });
  }

  public async create(
    company: CompanyEntity,
    input: JobInput,
  ): Promise<JobEntity> {
    const job = new JobEntity();
    job.companyName = company.name;
    job.name = input.name;
    job.slug = await this.generateSlug(input.name, company);
    job.type = input.type;
    job.summary = input.summary;
    job.description = input.description;
    job.keywords = input.keywords ? input.keywords : [];

    job.company = company;

    return this.repository.save(job);
  }

  public async findAllJobs(company: CompanyEntity): Promise<JobEntity[]> {
    return this.findAll({ where: { company } });
  }

  public async addInstance(input: AddJobInstanceInput): Promise<JobEntity> {
    const job = await this.findOneById(input.jobId);
    const instance = await this.instanceService.add(input.instance);
    job.instances = [instance];
    return this.repository.save(job);
  }

  public async addInstanceAddress(
    input: AddJobInstanceAddressInput,
  ): Promise<JobInstanceEntity> {
    const instance = await this.instanceService.addAddress(input);

    return instance;
  }
}
