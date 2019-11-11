import { Connection } from 'typeorm';

import { DB_CON_TOKEN } from '../database/database.constants';
import { CompanyContactEntity } from './entity';
import { COMPANY_CONTACT_TOKEN } from './contact.constants';

export const companyContactProviders = [
  {
    provide: COMPANY_CONTACT_TOKEN,
    useFactory: (connection: Connection) =>
      connection.getRepository(CompanyContactEntity),
    inject: [DB_CON_TOKEN],
  },
];
