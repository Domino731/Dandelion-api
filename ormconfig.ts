import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'qwerty',
  database: 'main',
  entities: ['dist/**/*.entity.js'],
  // TODO before release: change
  synchronize: true,
};

export default config;
