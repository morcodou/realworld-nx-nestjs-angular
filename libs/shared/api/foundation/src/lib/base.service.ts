import { FindConditions, FindManyOptions, FindOneOptions, InsertResult, Repository, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class BaseService<T> {
    public repository: Repository<T>

    async findAll(options?: FindManyOptions<T>): Promise<T[]> {
        return await this.repository.find(options);
    }

    async count(options: FindManyOptions<T> = {}): Promise<number> {
        return await this.repository.count(options);
    }

    async findOne(
        conditions?: FindConditions<T>, 
        options?: FindOneOptions<T>
    ): Promise<T> {
        return await this.repository.findOne(conditions, options);
    }

    async insert(
        data: QueryDeepPartialEntity<T>|QueryDeepPartialEntity<T>[]
    ): Promise<InsertResult> {
        return await this.repository.insert(data)
    }
    
    async update(
        condidtion: FindConditions<T>, 
        data: QueryDeepPartialEntity<T>
    ): Promise<UpdateResult> {
        return await this.repository.update(condidtion, data)
    }

    async softDelete(condition: FindConditions<T>): Promise<UpdateResult> {
        return await this.repository.softDelete(condition);
    }
}