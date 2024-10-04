import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book/entities/book.entity';
import { GenreModule } from './genre/genre.module';
import { LowercaseMiddleware } from './common/middleware/lowercase.middleware';


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
    entities: [__dirname + '**/**/*.entity{.ts,.js}', Book],
    synchronize: true,
    ssl: {
      rejectUnauthorized: true, // Pilas quitar en produccion
      ca: process.env.DS_SSL_CA,
    },
    
  }),

    BookModule,

    GenreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LowercaseMiddleware)
      .forRoutes('*');
  }
}
