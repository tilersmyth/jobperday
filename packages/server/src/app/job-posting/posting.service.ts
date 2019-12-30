import { Injectable, Inject } from '@nestjs/common';
import { Repository, Brackets } from 'typeorm';

import { CrudService } from '../../base';
import { AppLogger } from '../app.logger';
import { JOB_POSTING_TOKEN } from './posting.constants';
import { JobPostingEntity } from './entity';
import {
  AddJobPostingInput,
  AddJobPostingAddressInput,
  FindAllPostingsInput,
} from './inputs';
import { CompanyEntity, CompanyService } from '../company';
import { PaginationInput } from '../_helpers/inputs/pagination.input';
import { AddressEntity, AddressService, AddressRefTypeEnum } from '../address';
import { JobService } from '../job/job.service';
import { PostingStatusEnum } from './enums';

@Injectable()
export class JobPostingService {
  private logger = new AppLogger(JobPostingService.name);

  constructor(
    @Inject(JOB_POSTING_TOKEN)
    protected readonly repository: Repository<JobPostingEntity>,
    protected companyService: CompanyService,
    private readonly addressService: AddressService,
    private readonly jobService: JobService,
  ) {}

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
    posting.company = company;
    posting.applicationId = input.applicationId;
    return this.repository.save(posting);
  }

  public async findCurrent(company: CompanyEntity, input: PaginationInput) {
    const query = this.repository
      .createQueryBuilder('posting')
      .innerJoin('posting.company', 'company')
      .where('company.id = :id', { id: company.id })
      .andWhere('posting.apply_deadline > :now', { now: new Date() })
      .innerJoinAndSelect('posting.job', 'job')
      .skip(input.skip)
      .take(input.limit);

    const count = await query.getCount();
    const postings = await query.getMany();

    return { count, postings };
  }

  public async findOne(id: string) {
    const posting = await this.repository
      .createQueryBuilder('posting')
      .innerJoinAndSelect('posting.address', 'address')
      .where('posting.id = :id', { id })
      .leftJoinAndSelect('posting.job', 'job')
      .getOne();

    if (!posting) {
      return null;
    }

    const now = new Date();

    if (
      !posting.active ||
      posting.remaining_openings === 0 ||
      posting.apply_deadline <= now
    ) {
      posting.status = PostingStatusEnum.CLOSED;
      return posting;
    }

    posting.status = PostingStatusEnum.OPEN;
    return posting;
  }

  public async findAll(company: CompanyEntity, input: FindAllPostingsInput) {
    const query = this.repository
      .createQueryBuilder('posting')
      .innerJoin('posting.company', 'company')
      .where('company.id = :id', { id: company.id });

    if (input.status === PostingStatusEnum.OPEN) {
      query.andWhere(
        new Brackets(qb => {
          qb.where('posting.active = true')
            .andWhere('posting.remaining_openings > 0')
            .andWhere('posting.apply_deadline > :now', { now: new Date() });
        }),
      );
    }

    if (input.status === PostingStatusEnum.CLOSED) {
      query.andWhere(
        new Brackets(qb => {
          qb.where('posting.active = false ')
            .orWhere('posting.remaining_openings = 0')
            .orWhere('posting.apply_deadline <= :now', { now: new Date() });
        }),
      );
    }

    query
      .innerJoinAndSelect('posting.job', 'job')
      .orderBy('posting.created_at', input.filter.sort)
      .skip(input.pagination.skip)
      .take(input.pagination.limit);

    const count = await query.getCount();
    const postings = await query.getMany();

    return { count, postings };
  }

  public async count(company: CompanyEntity) {
    const count = await this.repository
      .createQueryBuilder('posting')
      .innerJoin('posting.company', 'company')
      .where('company.id = :id', { id: company.id })
      .select('COUNT(*)', 'total')
      .addSelect(
        'COUNT(posting.id) filter (WHERE apply_deadline > :deadline AND remaining_openings > 0 AND posting.active = true)',
        'open',
      )
      .setParameter('deadline', new Date())
      .getRawOne();

    return { open: count.open, closed: count.total - count.open };
  }
}
