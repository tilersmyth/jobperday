import { Connection } from 'typeorm';

import { DB_CON_TOKEN } from '../database/database.constants';
import { CompanyMemberEntity } from './entity/member.entity';
import { COMPANY_MEMBER_TOKEN } from './member.constants';

export const companyMemberProviders = [
  {
    provide: COMPANY_MEMBER_TOKEN,
    useFactory: (connection: Connection) =>
      connection.getRepository(CompanyMemberEntity),
    inject: [DB_CON_TOKEN],
  },
];
