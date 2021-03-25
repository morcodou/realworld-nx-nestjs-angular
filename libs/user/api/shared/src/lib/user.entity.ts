import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@realworld/shared/api/foundation';

@Entity()
export abstract class User extends BaseEntity {
  @Column({ unique: true })
  email: string;
  @Column({ unique: true })
  username: string;
  @Column()
  password: string;
  @Column()
  bio: string;
  @Column()
  image: string;
}