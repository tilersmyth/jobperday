import { Connection } from 'typeorm';

import { DB_CON_TOKEN } from '../database/database.constants';
import { JobEntity, JobInstanceEntity, JobAddressEntity } from './entity';
import {
  JOB_TOKEN,
  JOB_INSTANCE_TOKEN,
  JOB_ADDRESS_TOKEN,
} from './job.constants';

export const jobProviders = [
  {
    provide: JOB_TOKEN,
    useFactory: (connection: Connection) => connection.getRepository(JobEntity),
    inject: [DB_CON_TOKEN],
  },
  {
    provide: JOB_INSTANCE_TOKEN,
    useFactory: (connection: Connection) =>
      connection.getRepository(JobInstanceEntity),
    inject: [DB_CON_TOKEN],
  },
  {
    provide: JOB_ADDRESS_TOKEN,
    useFactory: (connection: Connection) =>
      connection.getRepository(JobAddressEntity),
    inject: [DB_CON_TOKEN],
  },
];
