import { Controller, Get, Param, Post, Body, Query, Put, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiOperation, ApiOkResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ProductResponse, ProductCreateRequest, ProductPaginatedRequest } from './product.dto';
import { Resources, Public } from 'src/core/decorators';
import { ResourceType } from 'src/database/entities/user-role.entity';

@ApiTags('Product')
@Controller('products')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Retrieves all products with query params' })
  @ApiOkResponse({ type: ProductResponse, description: 'Returns all products' })
  getAll(@Query() filter: ProductPaginatedRequest) {
    return this.service.getAll(filter);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'get product by Id' })
  @ApiOkResponse({ type: ProductResponse, description: 'get detail product' })
  get(@Param('id') id: string) {
    return this.service.get(id);
  }

  @Resources(ResourceType.Product)
  @ApiBearerAuth()
  @Post()
  addProduct(@Body() dto: ProductCreateRequest) {
    return this.service.addProduct(dto);
  }

  @Resources(ResourceType.Product)
  @Put(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'update a product' })
  @ApiOkResponse({ type: ProductResponse, description: 'Updated product' })
  async update(@Param('id')id: string, @Body() productRequest: ProductCreateRequest): Promise<any>{
    return this.service.update(id, {...productRequest});
  }

  @Resources(ResourceType.Product)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'delete a product' })
  @ApiOkResponse({ type: ProductResponse, description: 'delete product' })
  async delete(@Param('id')id: string): Promise<any>{
    return await this.service.delete(id);
  }
}
