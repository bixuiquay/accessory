import { IsNotEmpty, Allow } from "class-validator";
import { ApiResponseProperty, ApiProperty } from "@nestjs/swagger";

export class CategoryCreateRequest {
  @Allow()
  @ApiProperty({ example: 'Asus' })
  @IsNotEmpty()
  name: string
}

export class CategoryResponse {
  @ApiResponseProperty({ example: '1d7bc496-5865-4cfa-8f54-54fd4cd233d9' })
  id: string;
  
  @ApiResponseProperty({ example: 'Ram Laptop' })
  name: string;
}
