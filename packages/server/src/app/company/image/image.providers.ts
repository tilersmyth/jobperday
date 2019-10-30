import { Connection } from 'typeorm';

import { DB_CON_TOKEN } from '../../database/database.constants';
import { CompanyImageEntity } from './entity';
import { COMPANY_IMAGE_TOKEN } from './image.constants';

export const imageProviders = [
  {
    provide: COMPANY_IMAGE_TOKEN,
    useFactory: (connection: Connection) =>
      connection.getRepository(CompanyImageEntity),
    inject: [DB_CON_TOKEN],
  },
];
