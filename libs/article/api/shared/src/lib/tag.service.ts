import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '@realworld/shared/api/foundation';
import { Repository } from 'typeorm';
import { Tag } from './tag.entity';

@Injectable()
export class TagService extends BaseService<Tag> {
    constructor(
        @InjectRepository(Tag)
        repository: Repository<Tag>
    ) {
        super()
        this.repository = repository
    }
}
