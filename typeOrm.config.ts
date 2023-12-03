import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'qwerty',
  database: 'main',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: ['migrations/**'],
  synchronize: true,
});
