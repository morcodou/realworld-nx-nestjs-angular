import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@realworld/shared/api/foundation';

@Entity()
export abstract class Follow extends BaseEntity {
  @Column()
  followerId: string;
  @Column()
  followedId: string;
}