import { Module } from '@nestjs/common';
import { ArticleApiHandlersController } from './article-api-handlers.controller';
import { CommentApiHandlersController } from './comment-api-handlers.controller';
import { FavoriteApiHandlersController } from './favorite-api-handlers.controller';
import { ArticleApiSharedModule } from '@realworld/article/api/shared';

@Module({
  controllers: [ArticleApiHandlersController, CommentApiHandlersController, FavoriteApiHandlersController],
  providers: [],
  imports: [ArticleApiSharedModule],
})
export class ArticleApiHandlersModule {}
