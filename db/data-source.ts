import { DataSource, DataSourceOptions } from 'typeorm';

const dataSourceOptions: DataSourceOptions = {
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

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
