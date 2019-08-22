import { Resolver, Mutation, Args } from '@nestjs/graphql';

import { AppLogger } from '../app.logger';
import { CreateJobInput } from './inputs/create-job.input';
import { JobDto } from './dto/job.dto';
import { JobService } from './services';
import { Company, GraphqlGuard } from '../_helpers';
import { CompanyEntity } from '../company/entity';
import { Role } from '../company/roles.decorator';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../company/guards/roles.guard';
import { AddJobInstanceInput } from './inputs/add-job-instance.input';

@UseGuards(GraphqlGuard)
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

  @Mutation(() => Boolean)
  @Role('admin')
  @UseGuards(RolesGuard)
  async addJobInstance(@Args('input') input: AddJobInstanceInput) {
    const instance = await this.jobService.addInstance(input);
    this.logger.debug(`[addInstance] job instance added: ${instance.name}`);
    return true;
  }
}
