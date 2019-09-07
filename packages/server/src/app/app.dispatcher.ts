import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import cors from 'cors';

import { AppModule } from './app.module';
import { AppLogger } from './app.logger';
import { config } from '../config';
import { session } from './_helpers';

export class AppDispatcher {
  private app: INestApplication;
  private logger = new AppLogger(AppDispatcher.name);

  async dispatch(): Promise<void> {
    await this.createServer();
    return this.startServer();
  }

  async shutdown(): Promise<void> {
    await this.app.close();
  }

  private async createServer(): Promise<void> {
    this.app = await NestFactory.create(AppModule, {
      logger: new AppLogger('Nest'),
    });

    this.app.use(cors(config.cors));
    this.app.use(session());

    useContainer(this.app.select(AppModule), { fallbackOnErrors: true });
  }

  private async startServer(): Promise<void> {
    await this.app.listen(config.port, config.host);
    this.logger.log(`Server is listening http://${config.host}:${config.port}`);
  }
}
