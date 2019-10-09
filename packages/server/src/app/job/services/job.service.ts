import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { CrudService } from '../../../base';
import { AppLogger } from '../../app.logger';
import { JOB_TOKEN } from '../job.constants';
import { JobEntity, JobPostingEntity } from '../entity';
import { CompanyEntity } from '../../company/entity';
import { AddJobPostingInput } from '../inputs/add-job-posting.input';
import { JobPostingService } from './job-posting.service';
import { SlugGeneratorUtil } from '../../_helpers';
import { AddJobPostingAddressInput } from '../inputs/add-job-posting-address.input';
import { JobInput } from '../inputs/job.input';

@Injectable()
export class JobService extends CrudService<JobEntity> {
  private logger = new AppLogger(JobService.name);

  constructor(
    @Inject(JOB_TOKEN)
    protected readonly repository: Repository<JobEntity>,
    protected postingService: JobPostingService,
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
    job.tags = input.tags ? input.tags : [];

    job.company = company;

    return this.repository.save(job);
  }

  public async findAllJobs(company: CompanyEntity): Promise<JobEntity[]> {
    return this.findAll({ where: { company } });
  }

  public async addPosting(input: AddJobPostingInput): Promise<JobEntity> {
    const job = await this.findOneById(input.jobId);
    const posting = await this.postingService.add(input.posting);
    job.postings = [posting];
    return this.repository.save(job);
  }

  public async addPostingAddress(
    input: AddJobPostingAddressInput,
  ): Promise<JobPostingEntity> {
    return this.postingService.addAddress(input);
  }
}
