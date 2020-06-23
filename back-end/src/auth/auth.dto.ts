import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { ResourceType } from 'src/database';

export class LoginRequest {
  @ApiProperty({ example: 'john' })
  @IsString()
  readonly username: string;

  @ApiProperty({ example: 'changeme' })
  @IsString()
  readonly password: string;
}

export class RegisterRequest {
  @ApiProperty({ example: 'admin' })
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({ example: 'admin@gmail.com' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'minhto' })
  @IsNotEmpty()
  readonly lastName: string;

  @ApiProperty({ example: 'Tran' })
  @IsNotEmpty()
  readonly firstName: string;

  @ApiProperty({ example: 'p@ssw0rd' })
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({ example: '33sa' })
  @IsNotEmpty()
  readonly roleId: string;
}

export class UserRoleRequest {
  @ApiProperty({ example: 'role' })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: [ResourceType.Product,
    ResourceType.Brand, ResourceType.Category,
    ResourceType.Delivery, ResourceType.Guest,
    ResourceType.Order, ResourceType.ChildCategory
  ] })
  readonly resources: ResourceType[];
}

export class JwtPayload {
  @ApiProperty({ required: true, example: '0909090909' })
  @IsNotEmpty()
  username?: string;

  @ApiProperty({ required: true, example: 'addsdsdsd' })
  @IsNotEmpty()
  sub?: string;

  @ApiProperty({ required: true, example: [] })
  @IsNotEmpty()
  resources?: ResourceType[];
}
