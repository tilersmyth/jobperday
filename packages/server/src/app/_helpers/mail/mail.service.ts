import { SES } from 'aws-sdk';
import { Injectable } from '@nestjs/common';

import { config } from '../../../config';
import { AppLogger } from '../../app.logger';

@Injectable()
export class MailService {
  private logger = new AppLogger(MailService.name);

  public async send(params: SES.SendEmailRequest) {
    this.logger.debug(`[sent] recipient: ${params.Destination.ToAddresses}`);

    return new Promise((resolve, reject) => {
      new SES(config.ses).sendEmail(params, (err, data) => {
        if (err) {
          this.logger.debug(`[error] reason: ${err.code}`);
          return reject(err);
        }

        this.logger.debug(
          `[success] recipient: ${params.Destination.ToAddresses}`,
        );

        return resolve(data);
      });
    });
  }
}
