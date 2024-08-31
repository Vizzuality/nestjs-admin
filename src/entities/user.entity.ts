import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { Post } from './post.entity.js';
import { Comment } from './comment.entity.js';

@Entity({ name: 'users_test' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @OneToMany('Post', (post: Post) => post.user)
  posts: Post[];

  @OneToMany('Comment', (comment: Comment) => comment.user)
  comments: Comment[];
}
