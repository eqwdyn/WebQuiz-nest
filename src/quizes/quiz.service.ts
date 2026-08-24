import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { Quiz } from 'src/entities/quiz.entity';
import { CreateQuizDto } from 'src/quizes/dto/create-quiz.dto';
import { QuizStack } from 'src/quizes/interface/QuizStack.interface';
import { Repository, Not, In } from 'typeorm';

@Injectable()
export class QuizesService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
    private readonly categoriesService: CategoriesService,
  ) {}

  async findOne(id: number): Promise<Quiz> {
    const quiz = await this.quizRepository.findOne({
      where: { id },
    });

    if (!quiz) {
      throw new NotFoundException(`Квиз с id ${id} не найдено`);
    }

    return quiz;
  }

  async findByCategoryId(id: number): Promise<Quiz[]> {
    const quizez = await this.quizRepository.find({
      where: { category: { id } },
      order: { created_at: 'DESC' },
    });

    return quizez;
  }

  async getQuizStackByCategoryId(
    id: number,
    limit: number,
    offset: number,
  ): Promise<QuizStack> {
    const [data, total] = await this.quizRepository.findAndCount({
      where: { category: { id } },
      order: { created_at: 'DESC' },
      take: limit,
      skip: offset,
    });

    return {
      data,
      total,
    };
  }

  async getQuizStackByCategoryIdWithSkipParam(
    id: number,
    limit: number,
    idsToSkip: number[] | undefined,
  ): Promise<Quiz[]> {
    const where: any = {
      category: { id },
    };

    if (idsToSkip && idsToSkip.length > 0) {
      where.id = Not(In(idsToSkip));
    }

    const quizes = await this.quizRepository.find({
      where,
      order: { created_at: 'DESC' },
      take: limit,
    });

    if (quizes.length < limit) {
      const additionalQuizes = await this.quizRepository.find({
        where: { category: { id } },
        order: { created_at: 'ASC' },
        take: limit - quizes.length,
      });

      for (const addQuiz of additionalQuizes) {
        quizes.push(addQuiz);
      }
    }

    return quizes;
  }

  async create(dto: CreateQuizDto): Promise<Quiz> {
    const category = await this.categoriesService.findOne(dto.categoryId);

    const quiz = this.quizRepository.create({
      ...dto,
      answers: JSON.stringify(dto.answers),
      category,
    });

    await this.categoriesService.incrementQuestionsCount(dto.categoryId);
    return await this.quizRepository.save(quiz);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);

    await this.quizRepository.delete(id);
  }
}
