import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import faker from 'faker';
import moment from 'moment';

import { AppLogger } from '../../src/app';
import { JobEntity, JobInstanceEntity } from '../../src/app/job/entity';
import { JOB_INSTANCE_TOKEN } from '../../src/app/job/job.constants';
import { randomCoordGen } from '../utils/randomCoordGen.util';
import { randomNum } from '../utils/randomNum.util';

@Injectable()
export class JobInstanceSeedService {
  private logger = new AppLogger(JobInstanceSeedService.name);

  private datePlusDays(days: number) {
    return moment()
      .add(days, 'days')
      .toDate();
  }

  private datePlusHrs(date: Date, hours: number) {
    return moment(date)
      .add(hours, 'hours')
      .toDate();
  }

  constructor(
    @Inject(JOB_INSTANCE_TOKEN)
    protected readonly repository: Repository<JobInstanceEntity>,
  ) {}

  async save(jobs: JobEntity[]): Promise<JobInstanceEntity[]> {
    const instances: JobInstanceEntity[] = [];
    for (const job of jobs) {
      // State instance constants
      const pay_rate = faker.finance.amount(10, 30, 0);
      const location = randomCoordGen();
      // End instance constants

      const instanceCount: number = randomNum(1, 5);

      for (let i = 0; i < instanceCount; i++) {
        const apply_deadline = faker.date.between(
          this.datePlusDays(4 + i),
          this.datePlusDays(5 + i),
        );
        const start_date = faker.date.between(
          this.datePlusDays(5 + i),
          this.datePlusDays(6 + i),
        );

        const end_date = faker.date.between(
          this.datePlusHrs(start_date, randomNum(2, 6)),
          this.datePlusHrs(start_date, randomNum(6, 24)),
        );

        const instance = new JobInstanceEntity();
        instance.start_date = start_date;
        instance.end_date = end_date;
        instance.pay_rate = pay_rate;
        instance.total_openings = randomNum(1, 8);
        instance.apply_deadline = apply_deadline;
        instance.location = location;
        instance.job = job;
        const newInstance = await this.repository.save(instance);
        instances.push(newInstance);
      }
    }

    this.logger.log(`${instances.length} job instances created`);

    return instances;
  }
}
