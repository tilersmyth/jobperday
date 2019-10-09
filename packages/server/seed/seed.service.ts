import { Injectable } from '@nestjs/common';

import { AppLogger } from '../src/app';
import { UserSeedService } from './providers/user.service';
import { CompanySeedService } from './providers/company.service';
import { JobSeedService } from './providers/job.service';
import { JobPostingSeedService } from './providers/job-posting.service';

@Injectable()
export class SeedService {
  private logger = new AppLogger(SeedService.name);

  constructor(
    private readonly userService: UserSeedService,
    private readonly companyService: CompanySeedService,
    private readonly jobService: JobSeedService,
    private readonly postingService: JobPostingSeedService,
  ) {}

  async seed() {
    this.logger.debug('Seeding underway!');

    // Seed users
    const users = await this.userService.save(15);

    // Seed companies
    const companies = await this.companyService.save(users);

    // Seed jobs
    const jobs = await this.jobService.save(companies);

    // Add postings to jobs
    await this.postingService.save(jobs);
  }
}
