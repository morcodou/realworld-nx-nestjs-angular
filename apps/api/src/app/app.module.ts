import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { SharedApiCoreModule } from '@realworld/shared/api/core';

@Module({
  imports: [SharedApiCoreModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
