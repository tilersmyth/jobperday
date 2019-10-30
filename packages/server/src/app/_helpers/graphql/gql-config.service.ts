import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql';

import { config } from '../../../config';

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  createGqlOptions(): GqlModuleOptions {
    return {
      uploads: {
        maxFileSize: 10000000, // 10 MB
        maxFiles: 5,
      },
      cors: config.cors,
      introspection: true,
      playground: true,
      installSubscriptionHandlers: true,
      tracing: config.env !== 'production',
      debug: config.env !== 'production',
      autoSchemaFile: 'schema.gql',
      definitions: {
        outputAs: 'class',
      },
      formatError: error => {
        if (config.env === 'production') {
          const err: any = {};
          Object.assign(err, error);
          delete err.extensions;
          return err;
        }
        return error;
      },
      context: ({ req, res }) => {
        return { req, res };
      },
    };
  }
}
