import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '@realworld/shared/api/foundation';
import { Repository } from 'typeorm';
import { Favorite } from './favorite.entity';

@Injectable()
export class FavoriteService extends BaseService<Favorite> {
    constructor(
        @InjectRepository(Favorite)
        repository: Repository<Favorite>
    ) {
        super()
        this.repository = repository
    }
}
