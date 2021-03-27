import { Module } from '@nestjs/common';
import { ArticleApiSharedModule } from '@realworld/article/api/shared';
import { UserApiSharedModule } from '@realworld/user/api/shared';
import { ArticleApiHandlersController } from './article-api-handlers.controller';

@Module({
  controllers: [ArticleApiHandlersController],
  providers: [],
  imports: [ArticleApiSharedModule, UserApiSharedModule],
})
export class ArticleApiHandlersModule {}
