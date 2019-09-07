import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { AppLogger } from './app.logger';
import { GqlConfigService } from './_helpers';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';
import { JobModule } from './job/job.module';
import { SearchModule } from './search/search.module';

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
    SearchModule,
  ],
})
export class AppModule {
  private logger = new AppLogger(AppModule.name);

  constructor() {
    this.logger.log('Initialize constructor');
  }
}
