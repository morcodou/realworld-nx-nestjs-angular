import { BadRequestException, Module, ValidationError, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

@Module({
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useFactory: () => {
        return new ValidationPipe({
          exceptionFactory: (validationErrors: ValidationError[]) => {
            throw new BadRequestException(validationErrors.toString());
          },
        })
      },
    },
  ],
  exports: [],
})
export class SharedApiValidationsModule {}
