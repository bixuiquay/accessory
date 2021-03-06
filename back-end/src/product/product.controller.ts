import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiOperation, ApiOkResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ProductResponse, ProductCreateRequest } from './product.dto';
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
  async getAll() {
    return [
      {
        name: 'akakak',
      },
    ];
    // return await this.service.getAll();
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'get product by Id' })
  @ApiOkResponse({ type: ProductResponse, description: 'get detail product' })
  get(@Param('id') id: string) {
    return {
      id: id,
    };
  }

  @Resources(ResourceType.Product)
  @ApiBearerAuth()
  @Post()
  addProduct(@Body() dto: ProductCreateRequest) {
    
  }
}
