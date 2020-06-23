import { IsNotEmpty, Allow } from "class-validator";
import { ApiResponseProperty, ApiProperty } from "@nestjs/swagger";

export class BrandCreateRequest {
  @Allow()
  @IsNotEmpty()
  @ApiProperty({example: 'MSI'})
  name: string
}

export class BrandResponse {
  @ApiResponseProperty({ example: '1d7bc496-5865-4cfa-8f54-54fd4cd233d9' })
  id: string;
  
  @ApiResponseProperty({ example: 'Ram Laptop' })
  name: string;
}
