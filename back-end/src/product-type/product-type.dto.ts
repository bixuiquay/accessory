import { IsNotEmpty, Allow } from "class-validator";
import { ApiResponseProperty } from "@nestjs/swagger";

export class ProductTypeCreateRequest {
  @Allow()
  @IsNotEmpty()
  name: string
}

export class ProductTypeResponse {
  @ApiResponseProperty({ example: '1d7bc496-5865-4cfa-8f54-54fd4cd233d9' })
  id: string;
  
  @ApiResponseProperty({ example: 'Ram Laptop' })
  name: string;
}
