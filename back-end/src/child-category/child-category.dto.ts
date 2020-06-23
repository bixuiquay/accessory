import { IsNotEmpty, Allow } from "class-validator";
import { ApiResponseProperty, ApiProperty } from "@nestjs/swagger";

export class ChildCategoryCreateRequest {
  @Allow()
  @ApiProperty({ example: 'Asus' })
  @IsNotEmpty()
  name: string

  @Allow()
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  categoryId: number
}

export class ChildCategoryResponse {
  @ApiResponseProperty({ example: '1d7bc496-5865-4cfa-8f54-54fd4cd233d9' })
  id: string;
  
  @ApiResponseProperty({ example: 'Ram Laptop' })
  name: string;
}
