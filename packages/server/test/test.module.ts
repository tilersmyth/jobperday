import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { DatabaseModule } from '../src/app/database/database.module';
import { TestUtilsService, DatabaseService } from './services';
import { GqlConfigService } from '../src/app/_helpers';

@Module({
  providers: [DatabaseService, TestUtilsService],
  imports: [
    DatabaseModule,
    GraphQLModule.forRootAsync({
      useClass: GqlConfigService,
    }),
  ],
  exports: [TestUtilsService],
})
export class TestModule {}
