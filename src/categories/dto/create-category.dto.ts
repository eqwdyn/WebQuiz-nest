import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Название',
    example: 'HTML',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  title!: string;

  @ApiProperty({
    description: 'Url к иконке',
    example:
      'https://c0e4d041-eba7-495c-bd58-dbd184a94c09.s3.timeweb.com/html5-icon.svg',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  iconUrl!: string;
}
