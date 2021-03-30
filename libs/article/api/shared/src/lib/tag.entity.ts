import { BaseEntity } from '@realworld/shared/api/foundation';
import { Column, Entity } from 'typeorm';

@Entity()
export abstract class Tag extends BaseEntity {
  @Column({ unique: true })
  name: string;
  @Column()
  count: number;
}