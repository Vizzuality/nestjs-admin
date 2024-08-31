import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, RelationId, JoinColumn } from 'typeorm';
import { User } from './user.entity.js';
import { Comment } from './comment.entity.js';

@Entity({ name: 'posts'})
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne("User", (user: User) => user.posts)
  user: User;

  @OneToMany("Comment", (comment: Comment) => comment.post)
  comments: Comment[];

  @JoinColumn()
  userId: number;

}
