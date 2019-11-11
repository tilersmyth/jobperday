import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { AppLogger } from './app.logger';
import { GqlConfigService, UploadScalar } from './_helpers';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';
import { JobModule } from './job/job.module';
import { SearchModule } from './search/search.module';
import { ApplicationModule } from './application/application.module';
import { CompanyImageModule } from './company/image/image.module';
import { CompanyContactModule } from './company-contact';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UserModule,
    CompanyModule,
    CompanyContactModule,
    JobModule,
    UploadScalar,
    GraphQLModule.forRootAsync({
      useClass: GqlConfigService,
    }),
    SearchModule,
    ApplicationModule,
    CompanyImageModule,
  ],
})
export class AppModule {
  private logger = new AppLogger(AppModule.name);

  constructor() {
    this.logger.log('Initialize constructor');
  }
}
