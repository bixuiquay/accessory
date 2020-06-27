import { Controller, Body, Get, Post, Put, Param, Delete } from '@nestjs/common';
import { ResourceType } from 'src/database';
import { Resources, Public } from 'src/core/decorators';
import { ApiOperation, ApiOkResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CartResponse, CartCreateRequest, CartUpdateRequest } from './cart.dto';
import { CartService } from './cart.service';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(
    private readonly service: CartService
  ){}


  @Put(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'update a cart' })
  @ApiOkResponse({ type: CartResponse, description: 'update a new cart' })
  async add(@Param('id')id: number, @Body() categoryRequest: CartUpdateRequest): Promise<any>{
    return this.service.update(id, categoryRequest);
  }

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
