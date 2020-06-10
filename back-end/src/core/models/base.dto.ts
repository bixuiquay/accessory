import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';


import { Properties } from '../utils';

export enum SortDir {
  'ASC' = 'ASC',
  'DESC' = 'DESC'
}

export class BaseRequest {
  @ApiProperty({ example: '1d7bc496-5865-4cfa-8f54-54fd4cd233d9', readOnly: true, required: false })
  id: string;
}

export class BaseResponse {
  @ApiResponseProperty({ example: '1d7bc496-5865-4cfa-8f54-54fd4cd233d9' })
  id: string;

  @ApiResponseProperty({ example: '2019-04-27 16:55:16.274+07' })
  createdAt: string;

  @ApiResponseProperty({ example: '2019-04-27 16:55:16.274+07' })
  updatedAt: string;
}

export class AuditableResponse extends BaseResponse {
  @ApiResponseProperty({ example: 'Admin' })
  createdBy: string;

  @ApiResponseProperty({ example: '7dbd26e2-65c0-11ea-bc55-0242ac130003' })
  createdById: string;

  @ApiResponseProperty({ example: 'Admin' })
  updatedBy: string;

  @ApiResponseProperty({ example: '96b9175d-a4dd-488a-9625-6e03320629d7' })
  updatedById: string;
}

export class BasePaginatedRequest<T> {
  @Allow()
  @ApiProperty({ description: 'The page index', required: false, default: 1 })
  page?: number;

  @Allow()
  @ApiProperty({ description: 'The size per page', required: false, default: 10 })
  limit?: number;

  @Allow()
  @ApiProperty({ description: 'Sort by column', type: String, required: false, default: 'createdAt' })
  sortBy?: Properties<T>;

  @Allow()
  @ApiProperty({ description: 'Sort direction', type: SortDir, enum: Object.keys(SortDir), required: false })
  sortDir?: SortDir;
}

export type ClassType<T = any> = new (...args: any[]) => T;

// export function PaginatedResponse<T extends ClassType> (SourceType: T) {
//   class BasePaginatedResponse {
//     @ApiResponseProperty({ type: SourceType })
//     items: any[];

//     @ApiResponseProperty({ example: 10 })
//     itemCount: number;

//     @ApiResponseProperty({ example: 100 })
//     totalItems: number;

//     @ApiResponseProperty({ example: 10 })
//     totalPages: number;

//     @ApiResponseProperty({ example: 'http://domain.com/type?page=3' })
//     next?: string;

//     @ApiResponseProperty({ example: 'http://domain.com/type?page=1' })
//     previous?: string;
//   }

//   return BasePaginatedResponse;
// }
