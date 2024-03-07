import { join } from 'path';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './users/users.module';
import { WishModule } from './wishes/wish.module';
import { PassportModule } from './passport/passport.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
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
    PassportModule,
    UsersModule,
    WishModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
