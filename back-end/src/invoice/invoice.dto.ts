import { IsNotEmpty, Allow, IsEmail } from 'class-validator';
import { ApiResponseProperty, ApiProperty } from '@nestjs/swagger';
import { exception } from 'console';
import { BasePaginatedRequest } from 'src/core/models/base.dto';
import { Invoice } from 'src/database/entities/invoice.entity';

export class InvoiceCreateRequest {
  @Allow()
  @ApiProperty({ example: 'minh' })
  @IsNotEmpty()
  firstName: string;

  @Allow()
  @ApiProperty({ example: 'tom' })
  @IsNotEmpty()
  lastName: string;

  @Allow()
  @ApiProperty({
    example: [
      {
        id: '1d7bc496-5865-4cfa-8f54-54fd4cd233d9',
        quantity: 3,
      },
      { id: '1d7bc496-5865-4cfa-8f54-54fd4cd233d9',
      quantity: 5 },
    ],
  })
  @IsNotEmpty()
  products: any[];

  @Allow()
  @ApiProperty({ example: '180 Cao Lo' })
  @IsNotEmpty()
  address: string;

  @Allow()
  @ApiProperty({ example: 'ho chi minh' })
  @IsNotEmpty()
  city: string;

  @Allow()
  @ApiProperty({ example: 't@gmail.com' })
  @IsEmail()
  email: string;

  @Allow()
  @ApiProperty({ example: '399959595' })
  @IsNotEmpty()
  phone: string;

  @Allow()
  @ApiProperty({ example: '399959595' })
  note: string;
}

export class InvoicePaginatedRequest extends BasePaginatedRequest<Invoice> {
  // @Allow()
  // @ApiProperty({ description: 'child category id', required: false })
  // childCategoryId: number;
}

export class InvoiceResponse {
  @ApiResponseProperty({ example: '1d7bc496-5865-4cfa-8f54-54fd4cd233d9' })
  id: string;

  @ApiResponseProperty({ example: 'Ram Laptop' })
  name: string;
}
