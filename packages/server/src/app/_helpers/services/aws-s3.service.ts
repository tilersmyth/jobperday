import { Injectable } from '@nestjs/common';
import AWS, { AWSError } from 'aws-sdk';
import { ManagedUpload } from 'aws-sdk/clients/s3';
import { FileUpload } from 'graphql-upload';

import { AppLogger } from '../../app.logger';
import { config } from '../../../config';

@Injectable()
export class AWSS3Service {
  private logger = new AppLogger(AWSS3Service.name);

  private s3bucket = new AWS.S3({
    accessKeyId: config.s3.accessKeyId,
    secretAccessKey: config.s3.secretAccessKey,
  });

  public async upload(
    key: string,
    file: FileUpload,
  ): Promise<ManagedUpload.SendData> {
    try {
      const readStream = file.createReadStream();

      return new Promise((resolve, reject) => {
        this.s3bucket.upload(
          {
            Bucket: config.s3.bucket,
            Key: key,
            Body: readStream,
            ContentType: file.mimetype,
            ContentEncoding: file.encoding,
          },
          (err: AWSError, data: ManagedUpload.SendData) => {
            readStream.destroy();

            if (err) {
              return reject(err);
            }

            this.logger.debug(`[upload] successfully uploaded ${data.Key}`);

            return resolve(data);
          },
        );
      });
    } catch (error) {
      throw error;
    }
  }
}
