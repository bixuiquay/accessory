import { Injectable } from '@nestjs/common';
import { Category } from 'src/database';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChildCategoryCreateRequest } from './child-category.dto';
import { ChildCategory } from 'src/database/entities/child-category.entity';

@Injectable()
export class ChildCategoryService {
  constructor(
    @InjectRepository(ChildCategory)
    private readonly repository: Repository<Category>
  ) {}

  getAll(): Promise<any> {
    return this.repository.find();
  }

  add(childCategoryCreate: ChildCategoryCreateRequest): Promise<any> {
    const { name, categoryId } = childCategoryCreate;
    return this.repository.save({
      name,
      category: new Category({id: categoryId})
    });
  }

  async update(id: number, childCategoryCreate: ChildCategoryCreateRequest): Promise<any> {
    const e = await this.repository.findOne({id});

    const saveEntity = {...e,
      category: childCategoryCreate.categoryId,
      name: childCategoryCreate.name,
    };

    return await this.repository.save(saveEntity);

  }

  delete(id: number): Promise<any>{
    return this.repository.delete(
      {id}
    );
  }

}
