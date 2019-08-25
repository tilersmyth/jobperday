import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { DatabaseModule } from '../src/app/database/database.module';
import { TestUtilsService, DatabaseService } from './services';
import { SecurityModule } from '../src/app/security';
import { GqlConfigService } from '../src/app/_helpers';

@Module({
  providers: [DatabaseService, TestUtilsService],
  imports: [
    DatabaseModule,
    SecurityModule,
    GraphQLModule.forRootAsync({
      useClass: GqlConfigService,
    }),
  ],
  exports: [TestUtilsService],
})
export class TestModule {}
