import { join } from 'path';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'student',
  password: 'student',
  database: 'kupipodariday',
  entities: [join(__dirname, 'src', '**', '*.entity{.ts,.js}')],
  migrations: [join(__dirname, 'src', 'database', 'migrations', '*.ts')],
  synchronize: false,
});
