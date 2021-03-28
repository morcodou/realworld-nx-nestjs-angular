import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@realworld/shared/api/foundation';

@Entity()
export abstract class Favorite extends BaseEntity {
  @Column()
  userId: string;
  @Column()
  articleSlug: string;
}