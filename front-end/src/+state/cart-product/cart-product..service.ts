import { Injectable } from '@angular/core';
import { isEmpty, partial } from 'lodash-es';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/core/src';
import { HttpService } from 'src/core/src/lib/utils/http/http.service';
import { CartInfo, CartProduct } from './cart-product..model';
import { API_CART } from './cart-product.constant';

@Injectable()
export class CartProductService {
  
  /**
   * Constructor
   */
  constructor(
    private http: HttpService,
    private authService: AuthService
  ) {}

  /**
   * Get cart info
   *
   * @return {Observable<Pagination<FilterCartProductOptions[]>>}
   */
  getCart(id: number): Observable<CartInfo> {
    return this.http.get(`${API_CART}/${id}`, {
      header: {
        Authorization: ` Bearer ${this.authService.token}`
      }
    });
  }

  update(cartId: number, item: Partial<CartProduct>):Observable<CartProduct> {
    const formData = {
      productId: item.product.id,
      quantity: item.quantity
    };
    return this.http.put(`${API_CART}/${cartId}/product`, formData).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  deleteCartProduct(cartId, productId): Observable<CartProduct> {
    return this.http.delete(`${API_CART}/${cartId}/product/${productId}`).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  clearCartProduct(cartId): Observable<CartProduct> {
    return this.http.put(`${API_CART}/${cartId}/clear`, {}).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }
}
