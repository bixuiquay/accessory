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
  pricesale: number;

  @Allow()
  @ApiProperty({ example: 500000 })
  isfeature: boolean;

  @Allow()
  @ApiProperty({ example: 500000 })
  islastminute: boolean;

  @Allow()
  @ApiProperty({ example: 500000 })
  isflashsale: boolean;

  @Allow()
  @ApiProperty({ example: 500000 })
  iswishlist: number;

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
  pricesale: number;

  @ApiResponseProperty({ example: '1 or 2' })
  isfeature: boolean;

  @ApiResponseProperty({ example: '1 or 2' })
  islastminute: boolean;

  @ApiResponseProperty({ example: '1 or 2' })
  isflashsale: boolean;

  @ApiResponseProperty({ example: '5 like' })
  iswishlist: number;

  @ApiResponseProperty({ example: 'addad' })
  quantity: number;

  @ApiResponseProperty({ example: 'addad' })
  image: string;

  @ApiResponseProperty({ example: 'addad' })
  listImage: string[];
}