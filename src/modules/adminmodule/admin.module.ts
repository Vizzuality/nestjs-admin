import { Global, Module } from '@nestjs/common';
import { AdminModule } from '@adminjs/nestjs';
import AdminJS, { ComponentLoader } from 'adminjs';
import * as AdminJSTypeorm from '@adminjs/typeorm';
import { User } from '../../entities/user.entity.js';
import { Post } from '../../entities/post.entity.js';
import { Comment } from '../../entities/comment.entity.js';
import importExportFeature from '@adminjs/import-export';

AdminJS.registerAdapter({
  Database: AdminJSTypeorm.Database,
  Resource: AdminJSTypeorm.Resource,
});

const componentLoader = new ComponentLoader();
componentLoader.override('Login', './components/login.component');
componentLoader.override('DashboardRoute', './components/dashboard.component');

@Global()
@Module({
  imports: [
    AdminModule.createAdminAsync({
      useFactory: async () => {
        return {
          adminJsOptions: {
            rootPath: '/admin',
            componentLoader,
            resources: [
              {
                resource: User,
                features: [importExportFeature({ componentLoader })],
              },
              { resource: Post },
              { resource: Comment },
            ],
          },
          auth: {
            authenticate: async (email, password) => {
              return { email };
            },
            cookiePassword: process.env.USERNAME,
            cookieName: process.env.PASSWORD,
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
