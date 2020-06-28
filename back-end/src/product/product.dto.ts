import { Allow, IsNotEmpty } from 'class-validator';
import { AuditableResponse, BasePaginatedRequest } from 'src/core/models/base.dto';
import { ApiResponseProperty, ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/database';

export class ProductCreateRequest {
  @Allow()
  @ApiProperty({ example: 'O cung SSD 120 GB' })
  @IsNotEmpty()
  name: string;
  
  @Allow()
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  categoryId: number;

  @Allow()
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  brandId: number;

  @Allow()
  @ApiProperty({ example: `I don't know` })
  @IsNotEmpty()
  description: string;

  @Allow()
  @ApiProperty({ example: 500000 })
  @IsNotEmpty()
  price: number;
  
  @Allow()
  @ApiProperty({ example: 500000 })
  priceSale: number;

  @Allow()
  @ApiProperty({ example: false })
  isFeatured: boolean;

  @Allow()
  @ApiProperty({ example: false })
  isLastMinute: boolean;

  @Allow()
  @ApiProperty({ example: false })
  isFlashSale: boolean;

  @Allow()
  @ApiProperty({ example: true })
  isWishlist: boolean;

  @Allow()
  @ApiProperty({ example: 154 })
  @IsNotEmpty()
  quantity: number;

  @Allow()
  @ApiProperty({ example:  '13.2.jpg'})
  @IsNotEmpty()
  image: string;

  @Allow()
  @ApiProperty({ example:  ['13.2.jpg', '1580981363598Group 11 (3) - Copy.jpg']})
  @IsNotEmpty()
  listImage: string[];
}

export class ProductPaginatedRequest extends BasePaginatedRequest<Product>  {
  @Allow()
  @ApiProperty({ description: 'child category id', required: false })
  childCategoryId: number;

  @Allow()
  @ApiProperty({ description: 'brand id', required: false })
  brandId: number;

  @Allow()
  @ApiProperty({ description: 'search key', required: false })
  searchKeyword: string;
}

export class ProductResponse extends AuditableResponse {
  @ApiResponseProperty({ example: 'addad' })
  name: string;
  
  @ApiResponseProperty({ example: 'addad' })
  typeId: string;

  @ApiResponseProperty({ example: 'description' })
  description: string;
  
  @ApiResponseProperty({ example: 'addad' })
  price: number;

  @ApiResponseProperty({ example: '123123' })
  priceSale: number;

  @ApiResponseProperty({ example: '1 or 2' })
  isFeatured: boolean;

  @ApiResponseProperty({ example: '1 or 2' })
  isLastMinute: boolean;

  @ApiResponseProperty({ example: '1 or 2' })
  isFlashSale: boolean;

  @ApiResponseProperty({ example: '5 like' })
  isWishlist: number;

  @ApiResponseProperty({ example: 'addad' })
  quantity: number;

  @ApiResponseProperty({ example: 'addad' })
  image: string;

  @ApiResponseProperty({ example: 'addad' })
  listImage: string[];
}