import { IsString, IsNotEmpty, IsArray, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsEachAnswerString } from '../../utils/is-each-answer-string.validator';
import { IsCorrectAnswerInAnswers } from '../../utils/contains-correct-answer.validator';

export class CreateQuizDto {
  @ApiProperty({
    description: 'Вопрос',
    example: 'Какой тег используется для создания гиперссылки в HTML?',
    required: true,
  })
  @IsString()
  question!: string;

  @ApiProperty({
    description: 'Варианты ответов',
    example: ['<a>', '<link>', '<href>', '<url>'],
    required: true,
  })
  @IsArray()
  @IsNotEmpty()
  @IsEachAnswerString()
  answers!: string[];

  @ApiProperty({
    description: 'Правильный вариант ответа',
    example: '<a>',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @IsCorrectAnswerInAnswers()
  correctAnswer!: string;

  @ApiProperty({
    description: 'Объяснение',
    example:
      'Тег <a> (anchor) создает гиперссылку. Атрибут href задает адрес, а <link> служит для подключения внешних ресурсов (например, стилей).',
    required: true,
  })
  @IsString()
  explanation!: string;

  @ApiProperty({
    description: 'ID категории, к которой относится квиз',
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  categoryId!: number;
}
