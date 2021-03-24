import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedApiCoreModule } from '@realworld/shared/api/core';

@Module({
  imports: [SharedApiCoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
