import { LoggerService } from '@nestjs/common';
import { DateTime } from 'luxon';
import {
  Logger as LoggerInstance,
  transports,
  createLogger,
  format,
} from 'winston';
import { TransformableInfo } from 'logform';

import { config } from '../config';

const { combine, timestamp, printf, label } = format;

export class AppLogger implements LoggerService {
  private logger: LoggerInstance;

  format = printf((info: TransformableInfo) => {
    return `${info.timestamp} [${info.level.toUpperCase()}] ${info.label} - ${
      info.message
    }`;
  });

  constructor(logLabel?: string) {
    this.logger = createLogger({
      level: config.logger.level,
      format: combine(
        label({ label: logLabel }),
        timestamp({
          format: DateTime.local().toString(),
        }),
        this.format,
      ),
      transports: [new transports.Console()],
    });
  }

  error(message: string, trace: string) {
    this.logger.error(message, trace);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  log(message: string) {
    this.logger.info(message);
  }

  verbose(message: string) {
    this.logger.verbose(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  silly(message: string) {
    this.logger.silly(message);
  }
}
