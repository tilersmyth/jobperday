import { Connection } from 'typeorm';

import { DB_CON_TOKEN } from '../database/database.constants';
import { JOB_POSTING_TOKEN } from './posting.constants';
import { JobPostingEntity } from './entity';

export const jobPostingProviders = [
  {
    provide: JOB_POSTING_TOKEN,
    useFactory: (connection: Connection) =>
      connection.getRepository(JobPostingEntity),
    inject: [DB_CON_TOKEN],
  },
];
