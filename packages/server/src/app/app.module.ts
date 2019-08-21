import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { AppLogger } from './app.logger';
import { GqlConfigService, RequestContextMiddleware } from './_helpers';
import { AuthModule } from './auth/auth.module';
import { SecurityModule } from './security';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [
    DatabaseModule,
    GraphQLModule.forRootAsync({
      useClass: GqlConfigService,
    }),
    AuthModule,
    UserModule,
    SecurityModule,
    CompanyModule,
  ],
})
export class AppModule {
  private logger = new AppLogger(AppModule.name);

  constructor() {
    this.logger.log('Initialize constructor');
  }

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestContextMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
