import {  DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from '@lib/entities/user.entity';
import { Post } from '@lib/entities/post.entity';
import { Comment } from '@lib/entities/comment.entity';

dotenv.config({ path: '../.env'});
export const DB_URL = process.env.DB_URL as string;

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: DB_URL,
  entities: [User, Post, Comment],
  synchronize: true,
};

