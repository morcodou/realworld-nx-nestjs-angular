import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '@realworld/shared/api/foundation';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';

@Injectable()
export class CommentService extends BaseService<Comment> {
    constructor(
        @InjectRepository(Comment)
        repository: Repository<Comment>
    ) {
        super()
        this.repository = repository
    }
}
