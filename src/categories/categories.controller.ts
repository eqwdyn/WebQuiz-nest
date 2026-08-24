import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from 'src/categories/dto/create-category.dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Создать категорию' })
  @ApiResponse({ status: 201, description: 'Категория создана' })
  async create(@Body() dto: CreateCategoryDto) {
    return this.categoriesService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить все категории' })
  findAll() {
    console.log('Get categories Api');
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить категорию по ID' })
  @ApiResponse({ status: 404, description: 'Категория не найдена' })
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Удалить категорию' })
  @ApiResponse({ status: 404, description: 'Категория не найдена' })
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
