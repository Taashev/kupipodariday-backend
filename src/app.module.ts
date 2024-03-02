import { join } from 'path';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import { PassportModule } from './passport/passport.module';

import { AppController } from './app.controller';

import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'student',
      password: 'student',
      database: 'kupipodariday',
      entities: [join(__dirname, '**', '*.entity{.ts,.js}')],
      synchronize: false,
      uuidExtension: 'uuid-ossp',
    }),
    UsersModule,
    PassportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
