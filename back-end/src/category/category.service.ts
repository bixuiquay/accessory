import { Injectable } from '@nestjs/common';
import { Category } from 'src/database/entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryCreateRequest } from './category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly repository: Repository<Category>
  ) {}

  getAll(): Promise<any> {
    return this.repository.createQueryBuilder('category')
    .leftJoinAndSelect('category.childCategories','child_category')
    .getMany();
  }

  add(categoryCreate: CategoryCreateRequest): Promise<any> {
    return this.repository.save(categoryCreate);
  }
}
