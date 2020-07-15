import { BaseEntityV1 } from 'src/core/src';
import { Product } from '../product';

export interface CartProduct extends BaseEntityV1 {
  product: Product;
  quantity: number;
  productId?: string;
}

export interface CartInfo {
  cartProducts: CartProduct[];
  total: number;
}
