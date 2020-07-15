import { Controller, Body, Get, Post, Put, Param, Delete } from '@nestjs/common';
import { ResourceType } from 'src/database';
import { Resources, Public } from 'src/core/decorators';
import { ApiOperation, ApiOkResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CartResponse, CartCreateRequest, CartProductRequest } from './cart.dto';
import { CartService } from './cart.service';
import { CategoryResponse } from 'src/category/category.dto';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(
    private readonly service: CartService
  ){}

  @Put(':id/clear')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'delete a cart product' })
  @ApiOkResponse({ type: CartResponse, description: 'delete a cart product' })
  async clearCart(@Param('id')id: number): Promise<any>{
    return this.service.clearCart(id);
  }

  @Put(':id/product')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'update a cart product' })
  @ApiOkResponse({ type: CartResponse, description: 'update a cart product' })
  async update(@Param('id')id: number, @Body() cartProductRequest: CartProductRequest): Promise<any>{
    return this.service.update(id, cartProductRequest);
  }

  @Delete(':id/product/:productId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'delete a cart product' })
  @ApiOkResponse({ type: CartResponse, description: 'delete a cart product' })
  async delete(@Param('id')id: number, @Param('productId') productId: string): Promise<any>{
    return this.service.delete(id, productId);
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'get a cart' })
  @ApiOkResponse({ type: CategoryResponse, description: 'Get cart' })
  async get(@Param('id')id: number): Promise<any>{
    return this.service.get(id);
  }

  // @Resources(ResourceType.Cart)
  // @Delete(':id')
  // @ApiBearerAuth()
  // @ApiOperation({ summary: 'delete a Category' })
  // @ApiOkResponse({ type: CartResponse, description: 'delete category' })
  // async delete(@Param('id')id: number): Promise<any>{
  //   return await this.service.delete(id);
  // }

}
