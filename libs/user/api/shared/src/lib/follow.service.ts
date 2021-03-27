import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '@realworld/shared/api/foundation';
import { Repository } from 'typeorm';
import { Follow } from './follow.entity';

@Injectable()
export class FollowService extends BaseService<Follow> {
    constructor(
        @InjectRepository(Follow)
        repository: Repository<Follow>,
    ) {
        super()
        this.repository = repository
    }
}
