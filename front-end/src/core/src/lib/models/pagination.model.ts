import { environment } from '../environments/environment';

export interface PaginationOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
}

export interface Pagination<T> {
  items: T[];
  page: number;
  pageCount: number;
  pageSize: number;
  rowCount: number;
}

export const DEFAULT_PAGINATION_OPTIONS: PaginationOptions = {
  page: 1,
  limit: environment.pagination.pageSizeOptions[0]
};

/**
 * This is customize pagination to mapping from NestJS pagination response 
 */
export interface IPagination<T> {
  totalItems: number,
  itemCount: number,
  itemsPerPage: number,
  totalPages: number,
  currentPage: number,
  items: T[]
}