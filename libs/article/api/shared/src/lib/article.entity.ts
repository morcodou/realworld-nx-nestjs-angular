import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@realworld/shared/api/foundation';

@Entity()
export abstract class Article extends BaseEntity {
  @Column({unique: true})
  slug: string;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  body: string;
  @Column()
  authorUsername: string;
  @Column("json", {array: true})
  tagList: string[];
}