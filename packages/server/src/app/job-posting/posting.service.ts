import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { CrudService } from '../../base';
import { AppLogger } from '../app.logger';
import { JOB_POSTING_TOKEN } from './posting.constants';
import { JobPostingEntity } from './entity';
import { AddJobPostingInput, AddJobPostingAddressInput } from './inputs';
import { CompanyEntity, CompanyService } from '../company';
import { PaginationInput } from '../_helpers/inputs/pagination.input';
import { AddressEntity, AddressService, AddressRefTypeEnum } from '../address';
import { JobService } from '../job/job.service';

@Injectable()
export class JobPostingService extends CrudService<JobPostingEntity> {
  private logger = new AppLogger(JobPostingService.name);

  constructor(
    @Inject(JOB_POSTING_TOKEN)
    protected readonly repository: Repository<JobPostingEntity>,
    protected companyService: CompanyService,
    private readonly addressService: AddressService,
    private readonly jobService: JobService,
  ) {
    super();
  }

  private async handleAddress(
    input: AddJobPostingAddressInput,
    company: CompanyEntity,
  ): Promise<AddressEntity> {
    try {
      if (input.addressId) {
        // Could just return by ID but we need to know it belongs to company
        return this.addressService.findOne({
          where: {
            refType: AddressRefTypeEnum.COMPANY,
            refId: company.id,
            id: input.addressId,
          },
        });
      }

      if (!input.newAddress) {
        throw new Error(
          'Posting must have either existing address ID or new address',
        );
      }

      return this.addressService.create(
        company.id,
        AddressRefTypeEnum.COMPANY,
        input.newAddress,
      );
    } catch (error) {
      throw error;
    }
  }

  public async add(
    input: AddJobPostingInput,
    company: CompanyEntity,
  ): Promise<JobPostingEntity> {
    const job = await this.jobService.findOneById(input.jobId);
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
    posting.applicationId = input.applicationId;
    return this.repository.save(posting);
  }

  public async findCurrent(company: CompanyEntity, input: PaginationInput) {
    const query = this.repository
      .createQueryBuilder('posting')
      .where('posting.companyId = :id', { id: company.id })
      .andWhere('posting.apply_deadline > :now', { now: new Date() })
      .leftJoinAndSelect('posting.job', 'job')
      .skip(input.skip)
      .take(input.limit);

    const count = await query.getCount();
    const postings = await query.getMany();

    return { count, postings };
  }

  public async findSingle(id: string) {
    return this.repository
      .createQueryBuilder('posting')
      .where('posting.id = :id', { id })
      .leftJoinAndSelect('posting.job', 'job')
      .getOne();
  }
}
