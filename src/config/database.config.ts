import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Habit } from '../habits/entities/habit.entity';

export const createDatabaseConfig = (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  username: process.env.DB_USERNAME ?? 'postgres',
  password: process.env.DB_PASSWORD ?? 'postgres',
  database: process.env.DB_NAME ?? 'rehabit',
  synchronize: false,
  migrationsRun: false,
  autoLoadEntities: true,
  entities: [User, Habit],
  migrations: ['dist/src/database/migrations/*.js']
});

export const dataSourceOptions: DataSourceOptions = {
  ...(createDatabaseConfig() as DataSourceOptions),
  entities: [User, Habit],
  migrations: ['src/database/migrations/*.ts']
};

export const AppDataSource = new DataSource(dataSourceOptions);

export default createDatabaseConfig;
