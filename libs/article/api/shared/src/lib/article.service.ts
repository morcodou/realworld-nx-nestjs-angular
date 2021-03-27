import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '@realworld/shared/api/foundation';
import { Repository } from 'typeorm';
import { Article } from './article.entity';

@Injectable()
export class ArticleService extends BaseService<Article> {
    constructor(
        @InjectRepository(Article)
        repository: Repository<Article>
    ) {
        super()
        this.repository = repository
    }
}
