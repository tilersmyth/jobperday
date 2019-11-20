import { createConnection } from 'typeorm';

import { config } from '../../config';
import { DB_CON_TOKEN } from './database.constants';
import { AppLogger } from '../app.logger';

export const databaseProviders = [
  {
    provide: DB_CON_TOKEN,
    useFactory: async () => {
      const logger = new AppLogger('DB Connection');

      try {
        const conn = await createConnection(config.database);
        const migrations = await conn.runMigrations();

        if (migrations.length > 0) {
          logger.debug('migrations run');
        }

        return conn;
      } catch (err) {
        logger.error(err, 'db connection');
        throw err;
      }
    },
  },
];
