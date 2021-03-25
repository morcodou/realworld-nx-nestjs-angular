import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { SharedApiCoreModule } from '@realworld/shared/api/core';
import { UserApiHandlersModule } from '@realworld/user/api/handlers';

@Module({
  imports: [
    SharedApiCoreModule,
    UserApiHandlersModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
