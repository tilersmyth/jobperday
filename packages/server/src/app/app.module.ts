import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { AppLogger } from './app.logger';
import { GqlConfigService, ExpressSessionMiddleware } from './_helpers';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';
import { JobModule } from './job/job.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UserModule,
    CompanyModule,
    JobModule,
    GraphQLModule.forRootAsync({
      useClass: GqlConfigService,
    }),
  ],
})
export class AppModule {
  private logger = new AppLogger(AppModule.name);

  constructor() {
    this.logger.log('Initialize constructor');
  }

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ExpressSessionMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
