import { Injectable, Inject } from '@nestjs/common';
import { Repository, LessThan } from 'typeorm';

import { CrudService } from '../../../base';
import { AppLogger } from '../../app.logger';
import { JOB_POSTING_TOKEN, JOB_ADDRESS_TOKEN } from '../job.constants';
import { JobPostingEntity, JobAddressEntity } from '../entity';
import { AddJobPostingAddressInput } from '../inputs/add-job-posting-address.input';
import { AddJobPostingInput } from '../inputs/add-job-posting.input';

@Injectable()
export class JobPostingService extends CrudService<JobPostingEntity> {
  private logger = new AppLogger(JobPostingService.name);

  constructor(
    @Inject(JOB_POSTING_TOKEN)
    protected readonly repository: Repository<JobPostingEntity>,
    @Inject(JOB_ADDRESS_TOKEN)
    protected readonly addressReposity: Repository<JobAddressEntity>,
  ) {
    super();
  }

  private async handleAddress(
    input: AddJobPostingAddressInput,
  ): Promise<JobAddressEntity> {
    try {
      if (input.addressId) {
        return this.addressReposity.findOne({ where: { id: input.addressId } });
      }

      if (!input.newAddress) {
        throw new Error(
          'Posting must have either existing address ID or new address',
        );
      }

      const address = new JobAddressEntity();
      Object.assign(address, input.newAddress);
      return this.addressReposity.save(address);
    } catch (error) {
      throw error;
    }
  }

  public async add(input: AddJobPostingInput): Promise<JobPostingEntity> {
    const address = await this.handleAddress(input.address);
    const posting = new JobPostingEntity();
    Object.assign(posting, input.posting);
    posting.address = address;
    posting.location = {
      type: 'Point',
      coordinates: [address.coord_lng, address.coord_lat],
    };

    return this.repository.save(posting);
  }

  public async findCurrent(companyId: string) {
    return this.repository.find({
      where: { companyId, apply_deadline: LessThan(new Date()) },
    });
  }

  public async findPostingAddresses(companyId: string) {
    return this.addressReposity.find({
      where: { companyId },
    });
  }
}
