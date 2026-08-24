import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from 'src/categories/categories.module';
import { Category } from 'src/entities/category.entity';
import { Quiz } from 'src/entities/quiz.entity';
import { QuizesModule } from 'src/quizes/quiz.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    // CacheModule.register({
    //   ttl: 5 * 60 * 1000, // 5m
    //   isGlobal: true,
    // }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Category, Quiz],
      synchronize: true,
    }),
    QuizesModule,
    CategoriesModule,
  ],
})
export class AppModule {}
