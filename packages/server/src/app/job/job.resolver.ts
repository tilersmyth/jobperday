import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ID } from 'type-graphql';

import { AppLogger } from '../app.logger';
import { JobDto } from './dto/job.dto';
import { JobService } from './job.service';
import { Company } from '../_helpers';
import { CompanyEntity } from '../company/entity';
import { Role } from '../company/roles.decorator';
import { RolesGuard } from '../company/guards/roles.guard';
import { UserAuthGuard } from '../auth/guards/user-auth.guard';
import { JobInput } from './inputs/job.input';
import { UpdateJobInput } from './inputs/update-job.input';

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
    this.logger.debug(`[createJob] created job: ${job.title}`);
    return job;
  }

  @Mutation(() => JobDto)
  @Role('manager')
  @UseGuards(RolesGuard)
  async updateJob(
    @Company() company: CompanyEntity,
    @Args('companySlug') _: string,
    @Args('input') input: UpdateJobInput,
  ) {
    const job = await this.jobService.update(company, input);
    this.logger.debug(`[updateJob] updated job: ${job.title}`);
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
    @Args({ name: 'id', type: () => ID }) id: string,
  ) {
    return this.jobService.findOne({
      where: { company, id },
    });
  }
}
