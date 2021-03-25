import { Module } from '@nestjs/common';

import { UserApiHandlersController } from './user-api-handlers.controller';

@Module({
  controllers: [UserApiHandlersController],
  providers: [],
  exports: [],
})
export class UserApiHandlersModule {}
