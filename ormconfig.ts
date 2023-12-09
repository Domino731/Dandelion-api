import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'qwerty',
  database: 'main',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  cli: {
    migrationsDir: 'dist/db/migrations/*.js',
  },
  // TODO before release: change
  synchronize: true,
};

export default config;
