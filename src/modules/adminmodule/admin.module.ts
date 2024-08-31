import { Global, Module } from '@nestjs/common';
import { AdminModule } from '@adminjs/nestjs';
import AdminJS from 'adminjs';
import * as AdminJSTypeorm from '@adminjs/typeorm';
import { User } from '../../entities/user.entity.js';
import { Post } from '../../entities/post.entity.js';
import { Comment } from '../../entities/comment.entity.js';

AdminJS.registerAdapter({
  Database: AdminJSTypeorm.Database,
  Resource: AdminJSTypeorm.Resource,
});

@Global()
@Module({
  imports: [
    AdminModule.createAdminAsync({
      useFactory: async () => {
        return {
          adminJsOptions: {
            rootPath: '/admin',
            // Rename "organizations" to your table name or set "resources" to []
            resources: [User, Post, Comment],
          },
          auth: {
            authenticate: async (email, password) => {
              return { email };
            },
            cookiePassword: 'secret',
            cookieName: 'adminjs',
          },
          sessionOptions: {
            resave: true,
            saveUninitialized: true,
            secret: 'secret',
          },
        };
      },
    }),
  ],
})
export class AdminBaseModule {}
