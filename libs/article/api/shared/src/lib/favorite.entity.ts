import { BaseEntity } from '@realworld/shared/api/foundation';
import { Column, Entity } from 'typeorm';

@Entity()
export abstract class Favorite extends BaseEntity {
  @Column()
  userId: string;
  @Column()
  articleSlug: string;

  // @ManyToOne('Article', (article: any) => article.favorites)
  // @JoinColumn({name: 'articleSlug', referencedColumnName: 'slug'})
  // article: Article
}