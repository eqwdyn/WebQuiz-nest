import { Quiz } from 'src/entities/quiz.entity';

export interface QuizStack {
  data: Quiz[];
  total: number;
}
