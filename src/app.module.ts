import { Module } from '@nestjs/common';
import { AdminModule } from '@adminjs/nestjs';
import { ConfigModule } from '@nestjs/config';
import { Resource, Database, Adapter } from '@adminjs/sql'
import AdminJS from 'adminjs';

import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity.js';
import { Post } from './entities/post.entity.js';
import { Comment } from './entities/comment.entity.js';

AdminJS.registerAdapter({
  Database,
  Resource,
})

// NOTE: Due to some weird TS behavior with ESM or whatever, relations for entities are marked as string instead of usual arrow function with type. Otherwise it
// causes a circular dependency error. Check the entities

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
    AdminModule.createAdminAsync({
      useFactory: async () => {
        const options = {
          connectionString: process.env.DATABASE_URL as string,
          database: process.env.DATABASE_NAME as string,
        };
        const db = await new Adapter('postgresql', options).init();


        return {
          adminJsOptions: {
            rootPath: '/admin',
            // Rename "organizations" to your table name or set "resources" to []
             resources: [db.table('users_test'), db.table('posts'), db.table('comments')],
          },
          auth: {
            authenticate: async (email, password) => {
              return { email}
            },
            cookiePassword: 'secret',
            cookieName: 'adminjs',
          },
          sessionOptions: {
            resave: true,
            saveUninitialized: true,
            secret: 'secret',
          },
        }
      },
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
