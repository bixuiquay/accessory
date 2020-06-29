import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Pagination } from 'src/core/src';
import { FilterProductOptions, Product } from './product.model';
import { ProductQuery } from './product.query'
import { ProductService } from './product.service'
import { ProductStore } from './product.store'

@Injectable()
export class ProductFacade {
  loading$ = this.query.selectLoading();
  product$ = this.query.selectAll();

  /**
   * Constructor
   */
  constructor(
    protected store: ProductStore,
    protected query: ProductQuery,
    protected service: ProductService,
  ) {}

  /**
   * Get list of products
   *
   * @param  {FilterProductOptions} filters   The filters options
   * @return {Observable<CustomerMerchant[]>}
   */
  getAll(filters?: FilterProductOptions): Observable<Pagination<Product>> {
    this.store.setLoading(true);

    return this.service.getAll(filters).pipe(
      tap((data: Pagination<Product>) =>  this.store.set(data.items)),
      tap(() => this.store.setLoading(false))
    );
  }

  /**
   *  get a prđuct
   *
   */
  get(id: string): Observable<Product> {
    this.store.setLoading(true);

    return this.service.get(id).pipe(
      tap((data: Product) => {
        console.log('data: dkdkdkdk', data);
        this.store.update(id, data);
      }),
      tap(() => this.store.setLoading(false))
    )
  }

  // /**
  //  * Get all countries
  //  */
  // getCountries(): Observable<ICountry[]> {
  //   return this.service.getCountries();
  // }

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
