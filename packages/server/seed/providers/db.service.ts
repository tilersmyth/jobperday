import * as Path from 'path';
import * as fs from 'fs';
import { Injectable, Inject } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';

import { AppLogger } from '../../src/app/app.logger';
import { DB_CON_TOKEN } from '../../src/app/database/database.constants';

interface Entity {
  name: string;
  tableName: string;
}

@Injectable()
export class SeedDBService {
  private logger = new AppLogger(SeedDBService.name);

  constructor(@Inject(DB_CON_TOKEN) private connection: Connection) {}

  async getRepository<T>(entity: string): Promise<Repository<T>> {
    return this.connection.getRepository(entity);
  }

  /**
   * Shutdown the http server
   * and close database connections
   */
  async shutdownServer(server) {
    await server.httpServer.close();
    await this.closeDbConnection();
  }

  /**
   * Closes the database connections
   */
  async closeDbConnection() {
    const connection = await this.connection;
    if (connection.isConnected) {
      await (await this.connection).close();
    }
  }

  /**
   * Returns the entites of the database
   */
  private async getEntities() {
    const entities: Entity[] = [];
    (await (await this.connection).entityMetadatas).forEach(x =>
      entities.push({ name: x.name, tableName: x.tableName }),
    );
    return entities;
  }

  /**
   * Cleans the database and reloads the entries
   */
  async reloadFixtures() {
    const entities = await this.getEntities();
    await this.cleanAll(entities);
    await this.loadAll(entities);
  }

  /**
   * Cleans all the entities
   */
  async cleanAll(entities: Entity[]) {
    try {
      for (const entity of entities) {
        const repository = await this.getRepository(entity.name);

        const clean = await repository.query(
          `TRUNCATE ${entity.tableName} CASCADE;`,
        );
      }
    } catch (error) {
      this.logger.warn(`ERROR: Cleaning test db: ${error}`);
    }
  }

  /**
   * Insert the data from the src/test/fixtures folder
   */
  async loadAll(entities: Entity[]) {
    try {
      for (const entity of entities) {
        const repository = await this.getRepository(entity.name);
        const fixtureFile = Path.join(
          __dirname,
          `../test/fixtures/${entity.name}.json`,
        );
        if (fs.existsSync(fixtureFile)) {
          const items = JSON.parse(fs.readFileSync(fixtureFile, 'utf8'));
          await repository
            .createQueryBuilder(entity.name)
            .insert()
            .values(items)
            .execute();
        }
      }
    } catch (error) {
      this.logger.warn(
        `ERROR [TestUtils.loadAll()]: Loading fixtures on test db: ${error}`,
      );
    }
  }
}
