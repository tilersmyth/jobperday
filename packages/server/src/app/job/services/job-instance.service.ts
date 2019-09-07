import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { CrudService } from '../../../base';
import { AppLogger } from '../../app.logger';
import { JOB_INSTANCE_TOKEN, JOB_ADDRESS_TOKEN } from '../job.constants';
import { JobInstanceEntity, JobAddressEntity } from '../entity';
import { JobInstanceInput } from '../inputs/job-instance.input';
import { AddJobInstanceAddressInput } from '../inputs/add-job-instance-address.input';

@Injectable()
export class JobInstanceService extends CrudService<JobInstanceEntity> {
  private logger = new AppLogger(JobInstanceService.name);

  constructor(
    @Inject(JOB_INSTANCE_TOKEN)
    protected readonly repository: Repository<JobInstanceEntity>,
    @Inject(JOB_ADDRESS_TOKEN)
    protected readonly addressReposity: Repository<JobAddressEntity>,
  ) {
    super();
  }

  public async add(input: JobInstanceInput): Promise<JobInstanceEntity> {
    const instance = new JobInstanceEntity();
    instance.start_date = input.start_date;
    instance.end_date = input.end_date;
    instance.pay_rate = input.pay_rate;
    instance.total_openings = input.total_openings;
    instance.apply_deadline = input.apply_deadline;

    return this.repository.save(instance);
  }

  public async addAddress(
    input: AddJobInstanceAddressInput,
  ): Promise<JobInstanceEntity> {
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

    const instance = await this.findOneById(input.instanceId);
    instance.address = savedAddress;
    instance.location = {
      type: 'Point',
      coordinates: [input.address.coord_lng, input.address.coord_lat],
    };
    await this.repository.save(instance);

    return instance;
  }
}
