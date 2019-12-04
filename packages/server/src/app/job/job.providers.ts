import { Connection } from 'typeorm';

import { DB_CON_TOKEN } from '../database/database.constants';
import { JobEntity } from './entity';
import { JOB_TOKEN } from './job.constants';

export const jobProviders = [
  {
    provide: JOB_TOKEN,
    useFactory: (connection: Connection) => connection.getRepository(JobEntity),
    inject: [DB_CON_TOKEN],
  },
];
