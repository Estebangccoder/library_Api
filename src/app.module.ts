import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book/entities/book.entity';

@Module({
  imports: [ConfigModule.forRoot({
     envFilePath: '.env'
  }),
  TypeOrmModule.forRoot({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities:  [__dirname + '**/**/*.entity{.ts,.js}', Book],
    synchronize: false,
    ssl: {
      rejectUnauthorized: false, // Pilas quitar en produccion
    },
  }),
  
  BookModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
