import { Controller, Body, Get, Post, Put, Param, Delete } from '@nestjs/common';
import { ResourceType } from 'src/database';
import { Resources, Public } from 'src/core/decorators';
import { ApiOperation, ApiOkResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CategoryResponse, CartCreateRequest } from './cart.dto';
import { CartService } from './cart.service';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(
    private readonly service: CartService
  ){}


  // @Post()
  // @ApiBearerAuth()
  // @Resources(ResourceType.Cart)
  // @ApiOperation({ summary: 'Add a new category' })
  // @ApiOkResponse({ type: CategoryResponse, description: 'New category' })
  // async add(@Body() categoryRequest: CartCreateRequest): Promise<any>{
  //   return this.service.add(categoryRequest);
  // }

  // @Put(':id')
  // @ApiBearerAuth()
  // @Resources(ResourceType.Cart)
  // @ApiOperation({ summary: 'update a category' })
  // @ApiOkResponse({ type: CategoryResponse, description: 'Updated category' })
  // async update(@Param('id')id: number, @Body() cartRequest: CartCreateRequest): Promise<any>{
  //   return this.service.update(id, {...cartRequest});
  // }

  // @Resources(ResourceType.Cart)
  // @Delete(':id')
  // @ApiBearerAuth()
  // @ApiOperation({ summary: 'delete a Category' })
  // @ApiOkResponse({ type: CartResponse, description: 'delete category' })
  // async delete(@Param('id')id: number): Promise<any>{
  //   return await this.service.delete(id);
  // }

}
