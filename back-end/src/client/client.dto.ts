import { IsNotEmpty, Allow, IsEmail, IsString } from "class-validator";
import { ApiResponseProperty, ApiProperty } from "@nestjs/swagger";

export class ClientCreateRequest {
  @Allow()
  @ApiProperty({ example: 'Asus' })
  @IsNotEmpty()
  name: string;

  @Allow()
  @ApiProperty({ example: 'Asus' })
  @IsNotEmpty()
  shortName: string
}

export class ClientResponse {
  @ApiResponseProperty({ example: '1d7bc496-5865-4cfa-8f54-54fd4cd233d9' })
  id: string;
  
  @ApiResponseProperty({ example: 'Ram Laptop' })
  name: string;
}

export class ClientLogin {
  @ApiProperty({ example: 'admin@gmail.com' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'p@ssw0rd' })
  @IsString()
  readonly password: string;
}


export class ClientRegister {
  @ApiProperty({ example: 'admin' })
  readonly username: string;

  @ApiProperty({ example: 'admin@gmail.com' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'minhto' })
  readonly lastName: string;

  @ApiProperty({ example: 'Tran' })
  readonly firstName: string;

  @ApiProperty({ example: 'p@ssw0rd' })
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({ example: '123123' })
  readonly phonenumber: string;

  @ApiProperty({ example: 'hcm' })
  readonly city: string;

  @ApiProperty({ example: '163 ngo gia tu' })
  readonly address: string;
}
