import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import faker from 'faker';

import { AppLogger } from '../../src/app';
import { CompanyEntity } from '../../src/app/company/entity';
import { SlugGeneratorUtil } from '../../src/app/_helpers';
import { JobEntity } from '../../src/app/job/entity';
import { JOB_TOKEN } from '../../src/app/job/job.constants';
import { randomNum } from '../utils/randomNum.util';

@Injectable()
export class JobSeedService {
  private logger = new AppLogger(JobSeedService.name);

  constructor(
    @Inject(JOB_TOKEN)
    protected readonly repository: Repository<JobEntity>,
  ) {}

  private async generateSlug(
    name: string,
    company: CompanyEntity,
  ): Promise<string> {
    const slug = new SlugGeneratorUtil(this.repository);
    return slug.generate(name, { company });
  }

  private keywordGenerator() {
    const count = randomNum(1, 4);

    const keywords: string[] = [];
    for (let i = 1; i <= count; i++) {
      const word = faker.company.catchPhraseNoun();
      keywords.push(word);
    }

    return keywords;
  }

  async save(companies: CompanyEntity[]): Promise<JobEntity[]> {
    const jobs: JobEntity[] = [];
    for (const company of companies) {
      const jobCount: number = randomNum(1, 5);

      for (let i = 1; i <= jobCount; i++) {
        const job = new JobEntity();
        job.name = faker.name.jobTitle();
        job.slug = await this.generateSlug(job.name, company);
        job.summary = faker.lorem.sentence();
        job.description = faker.lorem.paragraph();
        job.type = faker.name.jobType();
        job.keywords = this.keywordGenerator();
        job.company = company;
        const savedJob = await this.repository.save(job);

        jobs.push(savedJob);
      }
    }

    this.logger.log(`${jobs.length} jobs created`);

    return jobs;
  }
}