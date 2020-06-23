import { Controller, Body, Get, Post } from '@nestjs/common';
import { ResourceType, Category } from 'src/database';
import { Resources, Public } from 'src/core/decorators';
import { ApiOperation, ApiOkResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ChildCategoryResponse, ChildCategoryCreateRequest } from './child-category.dto';
import { ChildCategoryService } from './child-category.service';

@ApiTags('childCategory')
@Controller('child-categories')
export class ChildCategoryController {
  constructor(
    private readonly service: ChildCategoryService
  ){}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all chid category' })
  @ApiOkResponse({ type: ChildCategoryResponse, description: 'get all child category ' })
  async getAll(): Promise<any>{
    return this.service.getAll();
  }

  @Resources(ResourceType.ChildCategory)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add a chid category' })
  @ApiOkResponse({ type: ChildCategoryResponse, description: 'add category ' })
  async add(@Body() childCategoryRequest: ChildCategoryCreateRequest): Promise<any>{
    return this.service.add(childCategoryRequest);
  }
}
