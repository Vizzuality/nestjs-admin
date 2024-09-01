import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity.js';
import { Post } from './entities/post.entity.js';
import { Comment } from './entities/comment.entity.js';
import { Database, Resource } from '@adminjs/sql';
import AdminJS from 'adminjs';
import { AdminBaseModule } from './modules/adminmodule/admin.module.js';
import { UsersModule } from './modules/users/users.module.js';
AdminJS.registerAdapter({
  Database,
  Resource,
});
// TODO: Due to some weird TS behavior with ESM or whatever, relations for entities are marked as string instead of usual arrow function with type. Otherwise it
//       causes a circular dependency error. Check the entities

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      synchronize: true,
      entities: [User, Post, Comment],
    }),
    AdminBaseModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
