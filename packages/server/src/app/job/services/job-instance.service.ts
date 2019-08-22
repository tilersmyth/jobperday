import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { AppLogger } from '../../app.logger';
import { JOB_INSTANCE_TOKEN } from '../job.constants';
import { JobInstanceEntity } from '../entity';
import { JobInstanceInput } from '../inputs/job-instance.input';

@Injectable()
export class JobInstanceService {
  private logger = new AppLogger(JobInstanceService.name);

  constructor(
    @Inject(JOB_INSTANCE_TOKEN)
    protected readonly repository: Repository<JobInstanceEntity>,
  ) {}

  public async add(input: JobInstanceInput): Promise<JobInstanceEntity> {
    const instance = new JobInstanceEntity();
    instance.date = input.date;
    instance.start_time = input.start_time;
    instance.end_time = input.end_time;
    instance.pay_rate = input.pay_rate;
    instance.total_openings = input.total_openings;
    instance.apply_deadline = input.apply_deadline;

    return this.repository.save(instance);
  }
}
