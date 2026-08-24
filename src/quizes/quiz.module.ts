import { Module } from '@nestjs/common';
import { QuizesService } from './quiz.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizesController } from 'src/quizes/quiz.controller';
import { CategoriesModule } from 'src/categories/categories.module';
import { Quiz } from 'src/entities/quiz.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz]), CategoriesModule],
  providers: [QuizesService],
  controllers: [QuizesController],
})
export class QuizesModule {}
