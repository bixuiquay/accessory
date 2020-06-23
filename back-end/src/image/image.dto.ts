import { ApiProperty } from '@nestjs/swagger';

export class ImageUploadDto {
  @ApiProperty({ type: 'array', format: 'binary' })
  images: any[];
}
