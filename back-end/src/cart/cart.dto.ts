import { IsNotEmpty, Allow } from "class-validator";
import { ApiResponseProperty, ApiProperty } from "@nestjs/swagger";

export class CartCreateRequest {
  @Allow()
  @ApiProperty({ example: '1d7bc496-5865-4cfa-8f54-54fd4cd233d9' })
  @IsNotEmpty()
  clientId: string;
}

export class CartResponse {
  @ApiResponseProperty({ example: '2' })
  id: string;
}

export class CartUpdateRequest {
  @Allow()
  @ApiProperty({ example: '1d7bc496-5865-4cfa-8f54-54fd4cd233d9' })
  @IsNotEmpty()
  productId: string;

  @Allow()
  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  quantity: number;
}
