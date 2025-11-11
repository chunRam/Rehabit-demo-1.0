import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { dataSourceOptions } from './src/config/database.config';

export default new DataSource(dataSourceOptions);
