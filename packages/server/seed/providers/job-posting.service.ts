import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import faker from 'faker';
import moment from 'moment';

import { AppLogger } from '../../src/app';
import { JobEntity } from '../../src/app/job/entity';
import { JobPostingEntity } from '../../src/app/job-posting';
import { JOB_POSTING_TOKEN } from '../../src/app/job-posting/posting.constants';
import { randomCoordGen } from '../utils/randomCoordGen.util';
import { randomNum } from '../utils/randomNum.util';
import { AddressRefTypeEnum, AddressService } from '../../src/app/address';

@Injectable()
export class JobPostingSeedService {
  private logger = new AppLogger(JobPostingSeedService.name);

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
    @Inject(JOB_POSTING_TOKEN)
    protected readonly repository: Repository<JobPostingEntity>,
    private readonly addressService: AddressService,
  ) {}

  async save(jobs: JobEntity[]): Promise<JobPostingEntity[]> {
    const postings: JobPostingEntity[] = [];
    for (const job of jobs) {
      // State posting constants
      const pay_rate = faker.finance.amount(10, 30, 0);
      const location = randomCoordGen();
      // End posting constants

      const postingCount: number = randomNum(1, 5);

      for (let i = 0; i < postingCount; i++) {
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

        const address = await this.addressService.create(
          job.company.id,
          AddressRefTypeEnum.COMPANY,
          {
            street: faker.address.streetAddress(),
            street2: null,
            city: faker.address.city(),
            state: faker.address.stateAbbr(),
            postal_code: faker.address.zipCode(),
            country: 'US',
            coord_lat: parseFloat(faker.address.latitude()),
            coord_lng: parseFloat(faker.address.latitude()),
          },
        );

        const posting = new JobPostingEntity();
        posting.start_date = start_date;
        posting.end_date = end_date;
        posting.pay_rate = pay_rate;
        posting.total_openings = randomNum(1, 8);
        posting.apply_deadline = apply_deadline;
        posting.location = location;
        posting.address = address;
        posting.companyId = job.company.id;
        posting.applicationId = job.default_application.id;
        posting.job = job;
        const newPosting = await this.repository.save(posting);
        postings.push(newPosting);
      }
    }

    this.logger.log(`${postings.length} job postings created`);

    return postings;
  }
}
