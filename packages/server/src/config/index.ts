import { ConnectionOptions } from 'typeorm';

type EnvTypes = 'test' | 'development' | 'production';

interface Config {
  env: EnvTypes;
  host: string;
  port: number;
  uuid: string;
  salt: string;
  database: ConnectionOptions;
  session: {
    domain: string;
    secret: string;
    timeout: number;
    refresh: {
      secret: string;
      timeout: number;
    };
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
}

export const config: Config = {
  env: process.env.NODE_ENV as EnvTypes,
  host: process.env.HOST,
  port: parseInt(process.env.PORT, 10),
  uuid: process.env.UUID,
  salt: process.env.USER_PASSWORD_SALT,
  database: {
    type: 'postgres',
    url: `${process.env.DATABASE_URL}${
      process.env.NODE_ENV === 'test' ? 'test' : ''
    }`,
    logging: process.env.NODE_ENV === 'test' ? false : true,
    synchronize: true,
    entities: [__dirname + '/../**/entity/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
    dropSchema: process.env.NODE_ENV === 'test' ? true : false,
  },
  session: {
    domain: process.env.SESSION_DOMAIN,
    secret: process.env.SESSION_SECRET,
    timeout: parseInt(process.env.SESSION_TIMEOUT, 10),
    refresh: {
      secret: process.env.SESSION_REFRESH_SECRET,
      timeout: parseInt(process.env.SESSION_REFRESH_TIMEOUT, 10),
    },
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
};
