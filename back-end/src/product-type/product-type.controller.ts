import { Controller } from '@nestjs/common';
import { ResourceType } from 'src/database';
import { Resources, Public } from 'src/core/decorators';
import { ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { ProductTypeResponse } from './product-type.dto';

@Resources(ResourceType.ProductType)
@Controller('product-type')
export class ProductTypeController {

  // @Public()
  // @ApiOperation({ summary: 'Get all product type' })
  // @ApiOkResponse({ type: ProductTypeResponse, description: 'get all product type ' })
  // getAll(): Promise<any>{

  // }
}
