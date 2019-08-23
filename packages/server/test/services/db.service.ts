import { Injectable, Inject } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';

import { DB_CON_TOKEN } from '../../src/app/database/database.constants';

@Injectable()
export class DatabaseService {
  constructor(@Inject(DB_CON_TOKEN) public connection: Connection) {}

  async getRepository<T>(entity: string): Promise<Repository<T>> {
    return this.connection.getRepository(entity);
  }
}
