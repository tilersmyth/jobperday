import { Module } from '@nestjs/common';

import { DatabaseModule } from '../src/app/database/database.module';
import { TestUtilsService, DatabaseService } from './services';

@Module({
  providers: [DatabaseService, TestUtilsService],
  imports: [DatabaseModule],
  exports: [TestUtilsService],
})
export class TestModule {}
