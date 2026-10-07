import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    const category = await this.categoryRepository.find({
      order: { created_at: 'DESC' },
    });

    return category;
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException(`Категория с id ${id} не найдена`);
    }

    return category;
  }

  async create(dto: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create(dto);

    return await this.categoryRepository.save(category);
  }

  /**
   * Does not checks target exists
   */
  async incrementQuestionsCount(id: number): Promise<void> {
    await this.categoryRepository.update(id, {
      questionsCount: () => 'questionsCount + 1',
    });
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);

    await this.categoryRepository.delete(id);
  }
}
