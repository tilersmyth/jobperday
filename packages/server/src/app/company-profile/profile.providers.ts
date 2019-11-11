import { Connection } from 'typeorm';

import { DB_CON_TOKEN } from '../database/database.constants';
import { CompanyProfileEntity } from './entity';
import { COMPANY_PROFILE_TOKEN } from './profile.constants';

export const companyProfileProviders = [
  {
    provide: COMPANY_PROFILE_TOKEN,
    useFactory: (connection: Connection) =>
      connection.getRepository(CompanyProfileEntity),
    inject: [DB_CON_TOKEN],
  },
];
