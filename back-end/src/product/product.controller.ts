import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiOperation, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProductResponse } from './product.dto';

@ApiTags('Product')
@Controller('products')
export class ProductController {
    constructor(private readonly service: ProductService) {

    }

    @Get()
    @ApiOperation({ summary: 'Retrieves all products with query params' })
    @ApiOkResponse({ type: ProductResponse, description: 'Returns all products' })
    async getAll() {
        return [{
            name: 'akakak'
        }];
        // return await this.service.getAll();
    }

    // public get() {
        
    // }
}
