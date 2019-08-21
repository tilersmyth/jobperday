import { Connection } from 'typeorm';

import { DB_CON_TOKEN } from '../database/database.constants';
import {
  CompanyEntity,
  CompanyMemberEntity,
  CompanyAddressEntity,
  CompanyProfileEntity,
} from './entity';
import {
  COMPANY_TOKEN,
  COMPANY_MEMBER_TOKEN,
  COMPANY_ADDRESS_TOKEN,
  COMPANY_PROFILE_TOKEN,
} from './company.constants';

export const companyProviders = [
  {
    provide: COMPANY_TOKEN,
    useFactory: (connection: Connection) =>
      connection.getRepository(CompanyEntity),
    inject: [DB_CON_TOKEN],
  },
  {
    provide: COMPANY_PROFILE_TOKEN,
    useFactory: (connection: Connection) =>
      connection.getRepository(CompanyProfileEntity),
    inject: [DB_CON_TOKEN],
  },
  {
    provide: COMPANY_ADDRESS_TOKEN,
    useFactory: (connection: Connection) =>
      connection.getRepository(CompanyAddressEntity),
    inject: [DB_CON_TOKEN],
  },
  {
    provide: COMPANY_MEMBER_TOKEN,
    useFactory: (connection: Connection) =>
      connection.getRepository(CompanyMemberEntity),
    inject: [DB_CON_TOKEN],
  },
];
