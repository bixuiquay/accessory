import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Pagination } from 'src/core/src';
import { Category, FilterCategoryOptions } from './category.model';
import { CategoryQuery } from './category.query'
import { CategoryService } from './category.service'
import { CategoryStore } from './category.store'

@Injectable()
export class CategoryFacade {
  loading$ = this.query.selectLoading();
  accounts$ = this.query.selectAll();

  /**
   * Constructor
   */
  constructor(
    protected store: CategoryStore,
    protected query: CategoryQuery,
    protected service: CategoryService,
  ) {}

  /**
   * Get list of products
   *
   * @param  {FilterCategoryOptions} filters   The filters options
   * @return {Observable<CustomerMerchant[]>}
   */
  getAll(filters?: FilterCategoryOptions): Observable<Pagination<Category>> {
    this.store.setLoading(true);

    return this.service.getAll(filters).pipe(
      tap((data: Pagination<Category>) =>  this.store.set(data.items)),
      tap(() => this.store.setLoading(false))
    );
  }

  // /**
  //  * Update user
  //  *
  //  */
  // update(item: Partial<Category>): Observable<Category> {
  //   this.store.setLoading(true);

  //   return this.service.update(item).pipe(
  //     tap((data: Category) => this.store.update(data.id, data)),
  //     tap(() => this.store.setLoading(false))
  //   )
  // }

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
