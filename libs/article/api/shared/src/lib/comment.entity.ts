import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@realworld/shared/api/foundation';

@Entity()
export abstract class Comment extends BaseEntity {
  @Column()
  articleId: string;
  @Column()
  authorId: string;
  @Column()
  body: string;
}