import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { ArticleService } from './article.service';
import { CommentService } from './comment.service';
import { Favorite } from './favorite.entity';
import { FavoriteService } from './favorite.service';
import { Tag } from './tag.entity';
import { TagService } from './tag.service';
import { Comment } from './comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article, Comment, Tag, Favorite]),
  ],
  providers: [ArticleService, CommentService, TagService, FavoriteService],
  exports: [ArticleService, CommentService, TagService, FavoriteService],
})
export class ArticleApiSharedModule {}
