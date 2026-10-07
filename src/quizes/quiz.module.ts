import { Module } from '@nestjs/common';
import { QuizesService } from './quiz.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizesController } from './quiz.controller';
import { Quiz } from '../entities/quiz.entity';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz]), CategoriesModule],
  providers: [QuizesService],
  controllers: [QuizesController],
})
export class QuizesModule {}
