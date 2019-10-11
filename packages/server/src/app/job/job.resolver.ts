import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { AppLogger } from '../app.logger';
import { JobDto } from './dto/job.dto';
import { JobService } from './services';
import { Company } from '../_helpers';
import { CompanyEntity } from '../company/entity';
import { Role } from '../company/roles.decorator';
import { RolesGuard } from '../company/guards/roles.guard';
import { AddJobPostingInput } from './inputs/add-job-posting.input';
import { UserAuthGuard } from '../auth/guards/user-auth.guard';
import { JobInput } from './inputs/job.input';
import { JobPostingDto } from './dto/job-posting.dto';

@UseGuards(UserAuthGuard)
@Resolver('Job')
export class JobResolver {
  private logger = new AppLogger(JobResolver.name);

  constructor(private readonly jobService: JobService) {}

  @Mutation(() => JobDto)
  @Role('manager')
  @UseGuards(RolesGuard)
  async createJob(
    @Company() company: CompanyEntity,
    @Args('companySlug') _: string,
    @Args('input') input: JobInput,
  ) {
    const job = await this.jobService.create(company, input);
    this.logger.debug(`[createJob] created job: ${job.name}`);
    return job;
  }

  @Query(() => [JobDto])
  @Role('manager')
  @UseGuards(RolesGuard)
  async findAllJobs(
    @Company() company: CompanyEntity,
    @Args('companySlug') _: string,
  ) {
    return this.jobService.findAllJobs(company);
  }

  @Query(() => [JobPostingDto])
  @Role('manager')
  @UseGuards(RolesGuard)
  async findCurrentPostings(
    @Company() company: CompanyEntity,
    @Args('companySlug') _: string,
  ) {
    return this.jobService.findCurrentPostings(company);
  }

  @Mutation(() => JobPostingDto)
  @Role('admin')
  @UseGuards(RolesGuard)
  async createPosting(
    @Args('companySlug') _: string,
    @Args('input') input: AddJobPostingInput,
  ) {
    const posting = await this.jobService.addPosting(input);
    this.logger.debug(`[addPosting] job posting added: ${posting.name}`);
    return posting;
  }
}
