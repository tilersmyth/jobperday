import { Connection } from 'typeorm';

import { DB_CON_TOKEN } from '../database/database.constants';
import { AddressEntity } from './entity';
import { ADDRESS_TOKEN } from './address.constants';

export const addressProviders = [
  {
    provide: ADDRESS_TOKEN,
    useFactory: (connection: Connection) =>
      connection.getRepository(AddressEntity),
    inject: [DB_CON_TOKEN],
  },
];
