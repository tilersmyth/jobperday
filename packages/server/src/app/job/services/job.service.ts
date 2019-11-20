import { Injectable, Inject } from '@nestjs/common';
import { Repository, IsNull } from 'typeorm';

import { CrudService } from '../../../base';
import { AppLogger } from '../../app.logger';
import { JOB_TOKEN } from '../job.constants';
import { JobEntity, JobPostingEntity } from '../entity';
import { CompanyEntity } from '../../company/entity';
import { AddJobPostingInput } from '../inputs/add-job-posting.input';
import { JobPostingService } from './job-posting.service';
import { JobInput } from '../inputs/job.input';
import { JobAddress } from '../interfaces/job-address.interface';
import { JobPostingResultsDto } from '../dto/job-posting-results.dto';
import { PaginationInput } from '../../_helpers/inputs/pagination.input';
import { UpdateJobInput } from '../inputs/update-job.input';
import { ApplicationService } from '../../application/services';

@Injectable()
export class JobService extends CrudService<JobEntity> {
  private logger = new AppLogger(JobService.name);

  constructor(
    @Inject(JOB_TOKEN)
    protected readonly repository: Repository<JobEntity>,
    protected postingService: JobPostingService,
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
