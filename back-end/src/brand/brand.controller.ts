import { Controller, Body, Get, Post, Put, Param, Delete } from '@nestjs/common';
import { ResourceType } from 'src/database';
import { Resources, Public } from 'src/core/decorators';
import { ApiOperation, ApiOkResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BrandResponse, BrandCreateRequest } from './branch.dto';
import { BrandService } from './branch.service';

@ApiTags('brand')
@Controller('brands')
export class BrandController {
  constructor(
    private readonly service: BrandService
  ){}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all brand' })
  @ApiOkResponse({ type: BrandResponse, description: 'get all brand ' })
  async getAll(): Promise<any>{
    return this.service.getAll();
  }

  @ApiBearerAuth()
  @Resources(ResourceType.Brand)
  @Post()
  @ApiOperation({ summary: 'Add a new brand' })
  @ApiOkResponse({ type: BrandResponse, description: 'Add a new brand ' })
  async add(@Body() categoryRequest: BrandCreateRequest): Promise<any>{
    return this.service.add(categoryRequest);
  }

  @Resources(ResourceType.Brand)
  @ApiBearerAuth()
  @Put(':id')
  @ApiOperation({ summary: 'update a brand' })
  @ApiOkResponse({ type: BrandResponse, description: 'Updated brand' })
  async update(@Param('id')id: number, @Body() brandRequest: BrandCreateRequest): Promise<any>{
    return this.service.update(id, {...brandRequest});
  }
  @Resources(ResourceType.Brand)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'delete a brand' })
  @ApiOkResponse({ type: BrandResponse, description: 'delete brand' })
  async delete(@Param('id')id: number): Promise<any>{
    return await this.service.delete(id);
  }

}
