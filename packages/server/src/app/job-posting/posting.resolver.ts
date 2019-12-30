import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ID } from 'type-graphql';

import { AppLogger } from '../app.logger';
import { Company } from '../_helpers';
import { CompanyEntity } from '../company/entity';
import { Role } from '../company/roles.decorator';
import { RolesGuard } from '../company/guards/roles.guard';
import { UserAuthGuard } from '../auth/guards/user-auth.guard';
import { PaginationInput } from '../_helpers/inputs/pagination.input';
import { JobPostingService } from './posting.service';
import {
  JobPostingResultsDto,
  JobPostingDto,
  JobPostingSingleDto,
  PostingCountDto,
} from './dto';
import { AddJobPostingInput, FindAllPostingsInput } from './inputs';

@UseGuards(UserAuthGuard)
@Resolver('Job/Posting')
export class JobPostingResolver {
  private logger = new AppLogger(JobPostingResolver.name);

  constructor(private readonly postingService: JobPostingService) {}

  @Query(() => JobPostingResultsDto)
  @Role('manager')
  @UseGuards(RolesGuard)
  async findCurrentPostings(
    @Company() company: CompanyEntity,
    @Args('companySlug') _: string,
    @Args('input') input: PaginationInput,
  ) {
    return this.postingService.findCurrent(company, input);
  }

  @Mutation(() => JobPostingDto)
  @Role('admin')
  @UseGuards(RolesGuard)
  async createPosting(
    @Company() company: CompanyEntity,
    @Args('companySlug') _: string,
    @Args('input') input: AddJobPostingInput,
  ) {
    const posting = await this.postingService.add(input, company);
    this.logger.debug(`[addPosting] job posting added: ${posting.id}`);
    return posting;
  }

  @Query(() => JobPostingSingleDto)
  @Role('manager')
  @UseGuards(RolesGuard)
  async findPosting(
    @Args('companySlug') _: string,
    @Args({ name: 'postingId', type: () => ID }) id: string,
  ) {
    return this.postingService.findOne(id);
  }

  @Query(() => JobPostingResultsDto)
  @Role('manager')
  @UseGuards(RolesGuard)
  async findAllPostings(
    @Company() company: CompanyEntity,
    @Args('companySlug') _: string,
    @Args('input') input: FindAllPostingsInput,
  ) {
    return this.postingService.findAll(company, input);
  }

  @Query(() => PostingCountDto)
  @Role('manager')
  @UseGuards(RolesGuard)
  async postingCount(
    @Company() company: CompanyEntity,
    @Args('companySlug') _: string,
  ) {
    return this.postingService.count(company);
  }
}
