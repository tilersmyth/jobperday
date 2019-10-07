import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { AppLogger } from '../app.logger';
import { CreateJobInput } from './inputs/create-job.input';
import { JobDto } from './dto/job.dto';
import { JobService } from './services';
import { Company } from '../_helpers';
import { CompanyEntity } from '../company/entity';
import { Role } from '../company/roles.decorator';
import { RolesGuard } from '../company/guards/roles.guard';
import { AddJobInstanceInput } from './inputs/add-job-instance.input';
import { UserAuthGuard } from '../auth/guards/user-auth.guard';
import { AddJobInstanceAddressInput } from './inputs/add-job-instance-address.input';

@UseGuards(UserAuthGuard)
@Resolver('Job')
export class JobResolver {
  private logger = new AppLogger(JobResolver.name);

  constructor(private readonly jobService: JobService) {}

  @Mutation(() => JobDto)
  @Role('admin')
  @UseGuards(RolesGuard)
  async createJob(
    @Company() company: CompanyEntity,
    @Args('input') input: CreateJobInput,
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
  async addJobInstance(@Args('input') input: AddJobInstanceInput) {
    const instance = await this.jobService.addInstance(input);
    this.logger.debug(`[addInstance] job instance added: ${instance.name}`);
    return true;
  }

  @Mutation(() => Boolean)
  @Role('admin')
  @UseGuards(RolesGuard)
  async addJobInstanceAddress(
    @Args('input') input: AddJobInstanceAddressInput,
  ) {
    const instance = await this.jobService.addInstanceAddress(input);
    this.logger.debug(`[addInstanceAddress] address added to ${instance.id}`);
    return true;
  }
}
