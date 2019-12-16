import { ConnectionOptions } from 'typeorm';

type EnvTypes = 'test' | 'development' | 'production';

interface Config {
  env: EnvTypes;
  host: string;
  port: number;
  salt: string;
  database: ConnectionOptions;
  session: {
    secret: string;
  };
  logger: {
    level: string;
  };
  validator: {
    validationError: {
      target: boolean;
      value: boolean;
    };
  };
  cors: {
    credentials: boolean;
    origin: string;
  };
  s3: {
    accessKeyId: string;
    secretAccessKey: string;
    bucket: string;
    region: string;
  };
  ses: {
    accessKeyId: string;
    secretAccessKey: string;
    region: string;
    sslEnabled: boolean;
  };
  google: {
    key: string;
  };
}

export const config: Config = {
  env: process.env.NODE_ENV as EnvTypes,
  host: process.env.HOST,
  port: parseInt(process.env.PORT, 10),
  salt: process.env.USER_PASSWORD_SALT,
  database: {
    type: 'postgres',
    url: `${process.env.DATABASE_URL}${
      process.env.NODE_ENV === 'test' ? 'test' : ''
    }`,
    logging: process.env.NODE_ENV !== 'test',
    synchronize: process.env.NODE_ENV === 'development',
    entities: [__dirname + '/../**/entity/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
    dropSchema: false,
  },
  session: {
    secret: process.env.SESSION_SECRET,
  },
  logger: {
    level: process.env.LOGGER_LEVEL,
  },
  validator: {
    validationError: {
      target: false,
      value: false,
    },
  },
  cors: {
    credentials: true,
    origin: process.env.FRONTEND_HOST,
  },
  s3: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    bucket: process.env.AWS_S3_BUCKET,
    region: process.env.AWS_SES_REGION,
  },
  ses: {
    accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY,
    region: process.env.AWS_SES_REGION,
    sslEnabled: process.env.NODE_ENV === 'production',
  },
  google: {
    key: process.env.GOOGLE_PLACES_API,
  },
};
