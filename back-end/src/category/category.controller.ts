import { Controller, Body, Get, Post } from '@nestjs/common';
import { ResourceType } from 'src/database';
import { Resources, Public } from 'src/core/decorators';
import { ApiOperation, ApiOkResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CategoryResponse, CategoryCreateRequest } from './category.dto';
import { CategoryService } from './category.service';

@ApiTags('category')
@Controller('categories')
export class CategoryController {
  constructor(
    private readonly service: CategoryService
  ){}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all category' })
  @ApiOkResponse({ type: CategoryResponse, description: 'get all category ' })
  async getAll(): Promise<any>{
    return this.service.getAll();
  }

  @Post()
  @ApiBearerAuth()
  @Resources(ResourceType.Category)
  @ApiOperation({ summary: 'Add a new category' })
  @ApiOkResponse({ type: CategoryResponse, description: 'New category' })
  async add(@Body() categoryRequest: CategoryCreateRequest): Promise<any>{
    return this.service.add(categoryRequest);
  }
}
