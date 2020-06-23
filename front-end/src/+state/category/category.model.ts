import { BaseEntity, PaginationOptions } from 'src/core/src';

export interface Category extends BaseEntity {
  name: string;
  shortName: string;
  childCategories: any[];
}

export interface FilterCategoryOptions extends PaginationOptions {
  page: number;
  limit: number;
  search: string;
  sortBy: string;
  sortDir: 'asc' | 'desc';
}
