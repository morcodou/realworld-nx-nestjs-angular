import { BaseEntity } from '@realworld/shared/api/foundation';
import { Column, Entity } from 'typeorm';

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
  authorId: string;
  @Column("json", {array: true})
  tagList: string[];

  // @OneToMany('Favorite', (favorite: any) => favorite.article)
  // @JoinColumn({name: 'slug', referencedColumnName: 'articleSlug'})
  // favorites: Favorite[]
}