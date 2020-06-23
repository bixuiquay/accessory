import { Module } from '@nestjs/common';
import { ChildCategoryController } from './child-category.controller';
import { ChildCategoryService } from './child-category.service';
import { ChildCategory } from 'src/database/entities/child-category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ChildCategoryController],
  providers: [ChildCategoryService],
  imports: [
    TypeOrmModule.forFeature([ChildCategory])
  ]
})
export class ChildCategoryModule {}
