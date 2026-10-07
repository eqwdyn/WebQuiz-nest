import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
  BadRequestException,
  //   UseInterceptors,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { QuizesService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { IdsToSkipDto } from './dto/ids-to-skip.dto';
import { Quiz } from '../entities/quiz.entity';
import { QuizStack } from './interface/QuizStack.interface';
// import { CacheInterceptor } from '@nestjs/cache-manager';

@ApiTags('Quizes')
@ApiResponse({
  status: 400,
  description: 'Validation error',
})
@ApiResponse({
  status: 500,
  description: 'Internal server error',
})
// @UseInterceptors(CacheInterceptor)
@Controller('quizes')
export class QuizesController {
  constructor(private readonly quizesService: QuizesService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Квиз успешно создан',
  })
  async create(@Body() dto: CreateQuizDto) {
    const answersSet = new Set(dto.answers);
    if (!answersSet.has(dto.correctAnswer)) {
      throw new BadRequestException(
        'Correct answer does not exists in array of answers',
      );
    }

    if (answersSet.size < dto.answers.length) {
      throw new BadRequestException('Dublicate in answers');
    }

    const quiz = await this.quizesService.create(dto);
    return {
      ...quiz,
      answers: JSON.parse(quiz.answers),
    };
  }

  @Post('category/stack/:id')
  @ApiOperation({
    summary: 'Получить подборку Квизов по категории с возможностью скипа',
  })
  @ApiResponse({ status: 200, description: 'Список Квиз' })
  async getQuizStackByCategoryIdWithSkipParam(
    @Param('id') idParam: string,
    @Body() dto: IdsToSkipDto,
  ): Promise<Quiz[]> {
    const id = Number(idParam);
    if (Number.isNaN(id)) {
      throw new BadRequestException('Invalid category id');
    }

    const limitRaw = dto.limit ?? '10';
    const safeLimit = Math.max(1, Math.min(Number(limitRaw), 100));

    const stack =
      await this.quizesService.getQuizStackByCategoryIdWithSkipParam(
        id,
        safeLimit,
        dto.idsToSkip,
      );

    return stack.map((quiz) => ({
      ...quiz,
      answers: JSON.parse(quiz.answers),
    }));
  }

  @Get('category/stack/:id')
  @ApiOperation({ summary: 'Получить подборку Квизов по категории' })
  @ApiResponse({ status: 200, description: 'Список Квиз' })
  async getQuizStackByCategoryId(
    @Param('id') idParam: string,
    @Query('limit') limitQuery: string,
    @Query('offset') offsetQuery: string,
  ): Promise<QuizStack> {
    const id = Number(idParam);
    if (Number.isNaN(id)) {
      throw new BadRequestException('Invalid category id');
    }

    const limitRaw = limitQuery ?? '10';
    const offsetRaw = offsetQuery ?? '0';
    const safeLimit = Math.max(1, Math.min(Number(limitRaw), 100));
    const safeOffset = Math.max(0, Number(offsetRaw));

    const stack = await this.quizesService.getQuizStackByCategoryId(
      id,
      safeLimit,
      safeOffset,
    );

    return {
      data: stack.data.map((quiz) => ({
        ...quiz,
        answers: JSON.parse(quiz.answers),
      })),
      total: stack.total,
    };
  }

  @Get('category/:id')
  @ApiOperation({ summary: 'Получить список Квизы по категории' })
  @ApiResponse({ status: 200, description: 'Список Квиз', type: [Quiz] })
  async findByCategoryId(@Param('id') id: string) {
    const quizes = await this.quizesService.findByCategoryId(+id);
    return quizes.map((quiz) => ({
      ...quiz,
      answers: JSON.parse(quiz.answers),
    }));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить Квизо по ID' })
  @ApiParam({ name: 'id', description: 'ID Квиза', type: 'number' })
  @ApiResponse({ status: 200, description: 'Квизо найдено', type: Quiz })
  @ApiResponse({ status: 404, description: 'Квизо не найдено' })
  async findOne(@Param('id') id: string) {
    const quiz = await this.quizesService.findOne(+id);
    return { ...quiz, answers: JSON.parse(quiz.answers) };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Удалить Квиз' })
  @ApiParam({
    name: 'id',
    description: 'ID Квиза для удаления',
    type: 'number',
  })
  @ApiResponse({ status: 204, description: 'Квиз удален' })
  @ApiResponse({ status: 404, description: 'Квиз не найден' })
  remove(@Param('id') id: string) {
    return this.quizesService.remove(+id);
  }
}
