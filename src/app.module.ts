// import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Quiz } from './entities/quiz.entity';
import { QuizesModule } from './quizes/quiz.module';
import { CategoriesModule } from './categories/categories.module';

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
      host: 'aws-0-us-east-1.pooler.supabase.com',
      port: 6543,
      username: 'postgres.pvmdteetrhuncxeqhgyb', // из POSTGRES_URL
      password: 'DmtkT9pLvX4DU6OT', // из POSTGRES_URL (срочно смените!)
      database: 'postgres',
      entities: [Category, Quiz],
      ssl: {
        rejectUnauthorized: false,
      },
      synchronize: false,
    }),
    QuizesModule,
    CategoriesModule,
  ],
})
export class AppModule {}
