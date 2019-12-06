import { Module } from '@nestjs/common';

import { SearchResolver } from './search.resolver';
import { SearchService } from './search.service';
import { DatabaseModule } from '../database/database.module';
import { jobProviders } from '../job/job.providers';
import { jobPostingProviders } from '../job-posting/posting.providers';

const PROVIDERS = [
  ...jobProviders,
  ...jobPostingProviders,
  SearchResolver,
  SearchService,
];

@Module({
  providers: [...PROVIDERS],
  imports: [DatabaseModule],
})
export class SearchModule {}
