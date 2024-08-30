import { DataSourceOptions } from 'typeorm';
import { DB_URL } from '../../../lib/data-source.js'



const config: DataSourceOptions = {
  /*
   Note: Casting "as any" to avoid TypeORM type errors when building a generic template.
   Please import types specific to your database dialect, i. e. PostgresConnectionOptions
  */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type: 'postgres',
  url: DB_URL,
  entities: [],
  migrations: [],
  migrationsRun: false,
  migrationsTableName: 'migrations',
  migrationsTransactionMode: 'all',
  subscribers: [],
};


export default config;
