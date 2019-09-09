import { createConnection } from 'typeorm';

import { config } from '../../config';
import { DB_CON_TOKEN } from './database.constants';

export const databaseProviders = [
  {
    provide: DB_CON_TOKEN,
    useFactory: async () => {
      try {
        const conn = await createConnection(config.database);
        await conn.runMigrations();
        return conn;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  },
];
