import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@realworld/shared/api/foundation';

@Entity()
export abstract class Article extends BaseEntity {
  @Column()
  slug: string;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  body: string;
  @Column()
  authorId: string;
  @Column("json", {array: true})
  tagList: string[];
}