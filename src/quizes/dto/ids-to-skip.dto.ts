import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class IdsToSkipDto {
  @ApiProperty({
    description: 'Id которые нужно пропустить',
    example: [1, 2, 3],
    required: true,
  })
  @IsOptional()
  @IsArray()
  @IsNotEmpty()
  idsToSkip?: number[];

  @ApiProperty({
    description: 'limit',
    example: 10,
    required: false,
  })
  @IsOptional()
  @IsInt()
  limit?: number;
}
