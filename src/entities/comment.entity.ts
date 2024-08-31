import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm';
import { User } from './user.entity.js';
import { Post } from './post.entity.js';

@Entity({ name: 'comments' })
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne('User', (user: User) => user.comments)
  user: User;

  @JoinColumn()
  userId: number;

  @ManyToOne('Post', (post: Post) => post.comments)
  post: Post;

  @JoinColumn()
  postId: number;
}
