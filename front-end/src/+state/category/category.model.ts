import { BaseEntity, PaginationOptions } from 'src/core/src';

export interface Category extends BaseEntity {
  name: string;
  categoryId: number;
  brandId: number;
  description: string;
  price: number;
  quantity: number;
}

export interface FilterCategoryOptions extends PaginationOptions {
  page: number;
  limit: number;
  search: string;
  sortBy: string;
  sortDir: 'asc' | 'desc';
}
