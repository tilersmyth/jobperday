import { NestFactory } from '@nestjs/core';

import { SeederModule } from './seed.module';
import { SeedService } from './seed.service';
import { AppLogger } from '../src/app';
import { SeedDBService } from './providers/db.service';

const bootstrap = async () => {
  const logger = new AppLogger('[Seeder App]');
  logger.log('Initializing...');

  try {
    const app = await NestFactory.createApplicationContext(SeederModule);
    const seeder = app.get<SeedService>(SeedService);

    logger.log('Cleaning DB');
    const dbService = app.get<SeedDBService>(SeedDBService);
    await dbService.reloadFixtures();

    try {
      await seeder.seed();
      logger.debug('Seeding complete!');
    } catch (error) {
      throw error;
    } finally {
      await app.close();
    }
  } catch (error) {
    logger.error('Seeding failed!', error.name);
    throw error;
  } finally {
    // Exit node process
    process.exit();
  }
};
bootstrap();
