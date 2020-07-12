import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/core/src';
import { CartInfo, CartProduct } from './cart-product..model';
import { CartProductQuery } from './cart-product..query'
import { CartProductService } from './cart-product..service'
import { CartProductStore } from './cart-product..store'

@Injectable()
export class CartProductFacade {
  loading$ = this.query.selectLoading();
  cartProducts$ = this.query.selectAll();
  selectedProducts: CartProduct[] = [];

  /**
   * Constructor
   */
  constructor(
    protected store: CartProductStore,
    protected query: CartProductQuery,
    protected service: CartProductService,
    protected authService: AuthService
  ) {}

  /**
   * Get list of products
   *
   * @param  {FilterCartProductOptions} filters   The filters options
   * @return {Observable<CustomerMerchant[]>}
   */
  getCartInfo(): Observable<CartInfo> {
    this.store.setLoading(true);
    if (this.authService.cart) {
      const cartId = this.authService.cart.id;

      return this.service.getCart(cartId).pipe(
        tap((data: CartInfo) =>  this.store.set(data.cartProducts)),
        tap(() => this.store.setLoading(false))
      );
    }
  }

  /**
   * Add product to cart
   *
   */
  addToCart(item: CartProduct): Observable<CartProduct> {
    if (!this.authService.cart) {
      return ;
    }

    this.store.setLoading(true);
    const cartId = this.authService.cart.id;
    return this.service.update(cartId, {...item}).pipe(
      tap((data: CartProduct) => {
        this.store.add({...item, productId: item.product.id});
        this.selectedProducts.push(item);
        this.store.setLoading(false)
      }),
      tap(() => this.store.setLoading(false))
    )
  }

  /**
   * Update product to cart
   *
   */
  updateToCart(item: CartProduct): Observable<CartProduct> {
    if (!this.authService.cart) {
      return ;
    }
    this.store.setLoading(true);
    const cartId = this.authService.cart.id;

    return this.service.update(cartId, {...item}).pipe(
      tap((data: CartProduct) => {
        console.log
        this.store.update(data.productId, item)
      }),
      tap(() => this.store.setLoading(false))
    );
  }

  getExitedProduct (productId: string) {
    const e = this.query.getEntity(productId);
    if (!e) {
      const m = this.selectedProducts.find(x => x.product.id === productId);

      if (m) {
        return {...m, productId: m.product.id};
      }
    }
    return e;
  }

  hasExit(productId: string) {
    return this.query.hasEntity(productId);
  }

  deleteCartProduct(productId): Observable<CartProduct> {
    if (!this.authService.cart) {
      return ;
    }

    this.store.setLoading(true);
    const cartId = this.authService.cart.id;

    return this.service.deleteCartProduct(cartId, productId).pipe(
      tap((data: CartProduct) => {
        this.store.remove(productId)
      }),
      tap(() => this.store.setLoading(false))
    );
  }


  // /**
  //  * Upload avatar
  //  *
  //  */
  // upload(files: File[]): Observable<any> {
  //   this.store.setLoading(true);

  //   return this.service.upload(files).pipe(
  //     tap(() => this.store.setLoading(false))
  //   );
  // }
}
