import { BaseEntity, PaginationOptions } from 'src/core/src';

export interface Product extends BaseEntity {
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  listImage: string[];
  priceSale: number;
  brandId: number;
}

export interface FilterProductOptions extends PaginationOptions {
  page?: number;
  limit?: number;
  brandId?: number;
  childCategoryId?: number;
  isFeatured?: boolean;
  isFlashSale?: boolean;
  isLastMinute?: boolean;
  isWishlist?: boolean;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
}
