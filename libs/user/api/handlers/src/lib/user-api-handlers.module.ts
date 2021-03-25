import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserApiHandlersController } from './user-api-handlers.controller';
import { ApiConfigService } from '@realworld/shared/api/config';
import { UserApiSharedModule } from '@realworld/user/api/shared';

@Module({
  imports: [
    UserApiSharedModule,
    JwtModule.registerAsync({
      useFactory: (config: ApiConfigService) => {
        return {
          secret: config.configs.jwtSecret,
          signOptions: {expiresIn: config.configs.jwtExpiresIn || '1d'}
        }
      },
      inject: [ApiConfigService]
    })
  ],
  controllers: [UserApiHandlersController],
})
export class UserApiHandlersModule {}
