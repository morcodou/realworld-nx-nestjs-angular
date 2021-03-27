import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@realworld/shared/api/foundation';

@Entity()
export abstract class Tag extends BaseEntity {
  @Column({ unique: true })
  name: string;
}