import { Allow, IsNotEmpty } from 'class-validator';
import { AuditableResponse } from 'src/core/models/base.dto';
import { ApiResponseProperty } from '@nestjs/swagger';

export class ProductCreateRequest {
  @Allow()
  @IsNotEmpty()
  name: string;
  
  @Allow()
  @IsNotEmpty()
  typeId: string;

  @Allow()
  @IsNotEmpty()
  description: string;

  @Allow()
  @IsNotEmpty()
  price: number;

  @Allow()
  @IsNotEmpty()
  quantity: number;

  @Allow()
  @IsNotEmpty()
  image: string;

  @Allow()
  @IsNotEmpty()
  listImage: string[];
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

  @ApiResponseProperty({ example: 'addad' })
  quantity: number;

  @ApiResponseProperty({ example: 'addad' })
  image: string;

  @ApiResponseProperty({ example: 'addad' })
  listImage: string[];
}