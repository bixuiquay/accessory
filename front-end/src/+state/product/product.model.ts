import { BaseEntity, PaginationOptions } from 'src/core/src';

export interface Product extends BaseEntity {
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  listImage: string[];
}

export interface FilterProductOptions extends PaginationOptions {
  page?: number;
  limit?: number;
  brandId?: number;
  childCategoryId?: number;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
}
