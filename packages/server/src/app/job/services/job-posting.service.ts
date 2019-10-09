import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { CrudService } from '../../../base';
import { AppLogger } from '../../app.logger';
import { JOB_POSTING_TOKEN, JOB_ADDRESS_TOKEN } from '../job.constants';
import { JobPostingEntity, JobAddressEntity } from '../entity';
import { JobPostingInput } from '../inputs/job-posting.input';
import { AddJobPostingAddressInput } from '../inputs/add-job-posting-address.input';

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

  public async add(input: JobPostingInput): Promise<JobPostingEntity> {
    const posting = new JobPostingEntity();
    posting.start_date = input.start_date;
    posting.end_date = input.end_date;
    posting.pay_rate = input.pay_rate;
    posting.total_openings = input.total_openings;
    posting.apply_deadline = input.apply_deadline;

    return this.repository.save(posting);
  }

  public async addAddress(
    input: AddJobPostingAddressInput,
  ): Promise<JobPostingEntity> {
    const address = new JobAddressEntity();
    address.street = input.address.street;
    address.street2 = input.address.street2;
    address.city = input.address.city;
    address.state = input.address.state;
    address.postal_code = input.address.postal_code;
    address.country = input.address.country;
    address.coord_lat = input.address.coord_lat;
    address.coord_lng = input.address.coord_lng;
    const savedAddress = await this.addressReposity.save(address);

    const posting = await this.findOneById(input.postingId);
    posting.address = savedAddress;
    posting.location = {
      type: 'Point',
      coordinates: [input.address.coord_lng, input.address.coord_lat],
    };
    await this.repository.save(posting);

    return posting;
  }
}
