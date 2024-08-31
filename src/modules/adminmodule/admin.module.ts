import { Global, Module } from '@nestjs/common';
import { Adapter, Database, Resource } from '@adminjs/sql';
import { AdminModule } from '@adminjs/nestjs';
import AdminJS from 'adminjs';

AdminJS.registerAdapter({
  Database,
  Resource,
});

@Global()
@Module({
  imports: [
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
            resources: [
              db.table('users_test'),
              db.table('posts'),
              db.table('comments'),
            ],
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
