import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  BaseEntity,
} from 'typeorm';
import { User } from './user.entity.js';
import { Comment } from './comment.entity.js';

@Entity({ name: 'posts' })
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne('User', (user: User) => user.posts)
  user: User;

  @OneToMany('Comment', (comment: Comment) => comment.post)
  comments: Comment[];

  @JoinColumn({ name: 'userId' })
  userId: number;
}
