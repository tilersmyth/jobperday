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
import { JobInput } from '../inputs/job.input';
import { JobAddress } from '../interfaces/job-address.interface';
import { CompanyService } from '../../company/company.service';
import { JobPostingResultsDto } from '../dto/job-posting-results.dto';
import { PaginationInput } from '../../_helpers/inputs/pagination.input';

@Injectable()
export class JobService extends CrudService<JobEntity> {
  private logger = new AppLogger(JobService.name);

  constructor(
    @Inject(JOB_TOKEN)
    protected readonly repository: Repository<JobEntity>,
    protected postingService: JobPostingService,
    protected companyService: CompanyService,
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

  public async findSingle(
    company: CompanyEntity,
    jobSlug: string,
  ): Promise<JobEntity> {
    return this.findOne({ where: { company, slug: jobSlug } });
  }

  public async findCurrentPostings(
    company: CompanyEntity,
    input: PaginationInput,
  ): Promise<JobPostingResultsDto> {
    return this.postingService.findCurrent(company.id, input);
  }

  public async addPosting(
    input: AddJobPostingInput,
    company: CompanyEntity,
  ): Promise<JobPostingEntity> {
    const job = await this.findOneById(input.jobId);
    return this.postingService.add(input, job, company);
  }

  public async findJobAddresses(company: CompanyEntity): Promise<JobAddress[]> {
    // const test = await this.companyService.findAllCompanyAddresses(company);

    // this.logger.debug(inspect(test));
    return [];
  }

  public async findPosting(id: string): Promise<JobPostingEntity> {
    return this.postingService.findSingle(id);
  }
}
