import { Controller, Body, Get, Post } from '@nestjs/common';
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
}
