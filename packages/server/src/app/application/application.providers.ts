import { Connection } from 'typeorm';

import { DB_CON_TOKEN } from '../database/database.constants';
import { ApplicationEntity, ApplicationFieldEntity } from './entity';
import {
  APPLICATION_TOKEN,
  APPLICATION_FIELD_TOKEN,
} from './application.constants';

export const applicationProviders = [
  {
    provide: APPLICATION_TOKEN,
    useFactory: (connection: Connection) =>
      connection.getRepository(ApplicationEntity),
    inject: [DB_CON_TOKEN],
  },
  {
    provide: APPLICATION_FIELD_TOKEN,
    useFactory: (connection: Connection) =>
      connection.getRepository(ApplicationFieldEntity),
    inject: [DB_CON_TOKEN],
  },
];
