import { Connection } from 'typeorm';

import { DB_CON_TOKEN } from '../database/database.constants';
import { JobEntity, JobPostingEntity } from './entity';
import { JOB_TOKEN, JOB_POSTING_TOKEN } from './job.constants';

export const jobProviders = [
  {
    provide: JOB_TOKEN,
    useFactory: (connection: Connection) => connection.getRepository(JobEntity),
    inject: [DB_CON_TOKEN],
  },
  {
    provide: JOB_POSTING_TOKEN,
    useFactory: (connection: Connection) =>
      connection.getRepository(JobPostingEntity),
    inject: [DB_CON_TOKEN],
  },
];
