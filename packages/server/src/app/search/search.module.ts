import { Module } from '@nestjs/common';

import { SearchResolver } from './search.resolver';
import { SearchService } from './search.service';
import { DatabaseModule } from '../database/database.module';
import { jobProviders } from '../job/job.providers';

const PROVIDERS = [...jobProviders, SearchResolver, SearchService];

@Module({
  providers: [...PROVIDERS],
  imports: [DatabaseModule],
})
export class SearchModule {}
