import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@realworld/shared/api/foundation';

@Entity()
export abstract class Comment extends BaseEntity {
  @Column()
  articleSlug: string;
  @Column()
  authorId: string;
  @Column()
  body: string;
}