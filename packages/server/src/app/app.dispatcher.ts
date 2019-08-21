import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';

import { AppModule } from './app.module';
import { config } from '../config';
import { AppLogger } from './app.logger';

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

    useContainer(this.app.select(AppModule), { fallbackOnErrors: true });
  }

  private async startServer(): Promise<void> {
    await this.app.listen(config.port, config.host);
    this.logger.log(`Server is listening http://${config.host}:${config.port}`);
  }
}
