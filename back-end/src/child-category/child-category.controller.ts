import { Controller, Body, Get, Post, Put, Param, Delete } from '@nestjs/common';
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

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'get a childCategory' })
  @ApiOkResponse({ type: ChildCategoryResponse, description: 'get childCategory' })
  async get(@Param('id')id: number): Promise<any>{
    return await this.service.get(id);
  }

  @Resources(ResourceType.ChildCategory)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add a chid category' })
  @ApiOkResponse({ type: ChildCategoryResponse, description: 'add category ' })
  async add(@Body() childCategoryRequest: ChildCategoryCreateRequest): Promise<any>{
    return this.service.add(childCategoryRequest);
  }

  @Resources(ResourceType.ChildCategory)
  @ApiBearerAuth()
  @Put(':id')
  @ApiOperation({ summary: 'update a childCategory' })
  @ApiOkResponse({ type: ChildCategoryResponse, description: 'Updated childCategory' })
  async update(@Param('id')id: number, @Body() childCategoryRequest: ChildCategoryCreateRequest): Promise<any>{
    return this.service.update(id, {...childCategoryRequest});
  }

  @Resources(ResourceType.Brand)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'delete a childCategory' })
  @ApiOkResponse({ type: ChildCategoryResponse, description: 'delete childCategory' })
  async delete(@Param('id')id: number): Promise<any>{
    return await this.service.delete(id);
  }


}
