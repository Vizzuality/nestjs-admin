import {  DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from '@lib/entities/user.entity';
import { Post } from '@lib/entities/post.entity';
import { Comment } from '@lib/entities/comment.entity';

dotenv.config({ path: '../.env'});


export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DB_URL,
  entities: [User, Post, Comment],
  synchronize: true,
};