import { Injectable, Inject } from '@nestjs/common';
import { Repository, MoreThan } from 'typeorm';

import { CrudService } from '../../../base';
import { AppLogger } from '../../app.logger';
import { JOB_POSTING_TOKEN } from '../job.constants';
import { JobPostingEntity, JobEntity } from '../entity';
import { AddJobPostingAddressInput } from '../inputs/add-job-posting-address.input';
import { AddJobPostingInput } from '../inputs/add-job-posting.input';
import { CompanyEntity, CompanyAddressEntity } from '../../company/entity';
import { CompanyService } from '../../company/services';
import { inspect } from 'util';
import { PaginationInput } from '../../_helpers/inputs/pagination.input';

@Injectable()
export class JobPostingService extends CrudService<JobPostingEntity> {
  private logger = new AppLogger(JobPostingService.name);

  constructor(
    @Inject(JOB_POSTING_TOKEN)
    protected readonly repository: Repository<JobPostingEntity>,
    protected companyService: CompanyService,
  ) {
    super();
  }

  private async handleAddress(
    input: AddJobPostingAddressInput,
    company: CompanyEntity,
  ): Promise<CompanyAddressEntity> {
    try {
      if (input.addressId) {
        return this.companyService.findOneCompanyAddress(input.addressId);
      }

      if (!input.newAddress) {
        throw new Error(
          'Posting must have either existing address ID or new address',
        );
      }

      return this.companyService.createCompanyAddress(
        company,
        input.newAddress,
      );
    } catch (error) {
      throw error;
    }
  }

  public async add(
    input: AddJobPostingInput,
    job: JobEntity,
    company: CompanyEntity,
  ): Promise<JobPostingEntity> {
    const address = await this.handleAddress(input.address, company);

    const posting = new JobPostingEntity();
    Object.assign(posting, input.posting);
    posting.address = address;
    posting.location = {
      type: 'Point',
      coordinates: [address.coord_lng, address.coord_lat],
    };
    posting.job = job;
    posting.companyId = company.id;
    return this.repository.save(posting);
  }

  public async findCurrent(companyId: string, input: PaginationInput) {
    // return this.repository.find({
    //   where: { companyId, apply_deadline: MoreThan(new Date()) },
    //   relations: ['job'],
    // });

    const query = this.repository
      .createQueryBuilder('posting')
      .where('posting.companyId = :companyId', { companyId })
      .andWhere('posting.apply_deadline > :now', { now: new Date() })
      .leftJoinAndSelect('posting.job', 'job')
      .skip(input.skip)
      .take(input.limit);

    const count = await query.getCount();
    const postings = await query.getMany();

    return { count, postings };
  }
}
