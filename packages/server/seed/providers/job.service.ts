import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import faker from 'faker';

import { AppLogger } from '../../src/app';
import { CompanyEntity } from '../../src/app/company/entity';
import { JobEntity } from '../../src/app/job/entity';
import { JOB_TOKEN } from '../../src/app/job/job.constants';
import { randomNum } from '../utils/randomNum.util';
import { ApplicationSeedService } from './application.service';

@Injectable()
export class JobSeedService {
  private logger = new AppLogger(JobSeedService.name);

  constructor(
    @Inject(JOB_TOKEN)
    protected readonly repository: Repository<JobEntity>,
    protected appService: ApplicationSeedService,
  ) {}

  private tagGenerator() {
    const count = randomNum(1, 4);

    const tags: string[] = [];
    for (let i = 1; i <= count; i++) {
      const word = faker.company.catchPhraseNoun();
      tags.push(word);
    }

    return tags;
  }

  async save(companies: CompanyEntity[]): Promise<JobEntity[]> {
    const jobs: JobEntity[] = [];

    for (const company of companies) {
      const jobCount = randomNum(1, 5);

      const application = await this.appService.create(company);

      for (let i = 1; i <= jobCount; i++) {
        const imageIndex = randomNum(1, 11);
        const job = new JobEntity();
        job.title = faker.name.jobTitle();
        job.summary = faker.lorem.sentence();
        job.description = faker.lorem.paragraph();
        job.type = faker.name.jobType();
        job.tags = this.tagGenerator();
        job.default_image = `https://jobperday-dev.s3.amazonaws.com/sample/cover/cover_sample-${imageIndex}.png`;
        job.default_application = application;
        job.company = company;
        const savedJob = await this.repository.save(job);

        jobs.push(savedJob);
      }
    }

    this.logger.log(`${jobs.length} jobs created`);

    return jobs;
  }
}
