import { Connection } from 'typeorm';

import { DB_CON_TOKEN } from '../database/database.constants';
import { CompanyEntity } from './entity';
import { COMPANY_TOKEN } from './company.constants';

export const companyProviders = [
  {
    provide: COMPANY_TOKEN,
    useFactory: (connection: Connection) =>
      connection.getRepository(CompanyEntity),
    inject: [DB_CON_TOKEN],
  },
];
