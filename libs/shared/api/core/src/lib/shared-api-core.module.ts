import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedApiConfigModule } from '@realworld/shared/api/config';
import { SharedApiErrorHandlerModule } from '@realworld/shared/api/error-handler';
import { SharedApiValidationsModule } from '@realworld/shared/api/validations';
import { environment } from 'apps/api/src/environments/environment';


@Module({
  imports: [
    SharedApiConfigModule.forRoot(environment),
    TypeOrmModule.forRoot(), 
    SharedApiErrorHandlerModule,
    SharedApiValidationsModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class SharedApiCoreModule {}
