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
import { AddJobPostingAddressInput } from './inputs/add-job-posting-address.input';
import { JobInput } from './inputs/job.input';

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

  @Mutation(() => Boolean)
  @Role('admin')
  @UseGuards(RolesGuard)
  async addJobPosting(@Args('input') input: AddJobPostingInput) {
    const posting = await this.jobService.addPosting(input);
    this.logger.debug(`[addPosting] job posting added: ${posting.name}`);
    return true;
  }

  @Mutation(() => Boolean)
  @Role('admin')
  @UseGuards(RolesGuard)
  async addJobPostingAddress(@Args('input') input: AddJobPostingAddressInput) {
    const posting = await this.jobService.addPostingAddress(input);
    this.logger.debug(`[addPostingAddress] address added to ${posting.id}`);
    return true;
  }
}
