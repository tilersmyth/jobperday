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
import { JobAddressDto } from './dto/job-address.dto';
import { JobPostingResultsDto } from './dto/job-posting-results.dto';
import { PaginationInput } from '../_helpers/inputs/pagination.input';

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

  @Query(() => JobDto)
  @Role('manager')
  @UseGuards(RolesGuard)
  async findJob(
    @Company() company: CompanyEntity,
    @Args('companySlug') _: string,
    @Args('jobSlug') jobSlug: string,
  ) {
    return this.jobService.findSingle(company, jobSlug);
  }

  @Query(() => JobPostingResultsDto)
  @Role('manager')
  @UseGuards(RolesGuard)
  async findCurrentPostings(
    @Company() company: CompanyEntity,
    @Args('companySlug') _: string,
    @Args('input') input: PaginationInput,
  ) {
    return this.jobService.findCurrentPostings(company, input);
  }

  @Query(() => [JobAddressDto])
  @Role('manager')
  @UseGuards(RolesGuard)
  async findJobAddresses(
    @Company() company: CompanyEntity,
    @Args('companySlug') _: string,
  ) {
    return this.jobService.findJobAddresses(company);
  }

  @Mutation(() => JobPostingDto)
  @Role('admin')
  @UseGuards(RolesGuard)
  async createPosting(
    @Company() company: CompanyEntity,
    @Args('companySlug') _: string,
    @Args('input') input: AddJobPostingInput,
  ) {
    const posting = await this.jobService.addPosting(input, company);
    this.logger.debug(`[addPosting] job posting added: ${posting.id}`);
    return posting;
  }

  @Query(() => JobPostingDto)
  @Role('manager')
  @UseGuards(RolesGuard)
  async findPosting(
    @Args('companySlug') _: string,
    @Args('postingId') id: string,
  ) {
    return this.jobService.findPosting(id);
  }
}
