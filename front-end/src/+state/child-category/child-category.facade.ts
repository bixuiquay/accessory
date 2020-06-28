import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ChildCategory } from './child-category.model';
import { ChildCategoryQuery } from './child-category.query'
import { ChildCategoryService } from './child-category.service'
import { ChildCategoryStore } from './child-category.store'

@Injectable()
export class ChildCategoryFacade {
  loading$ = this.query.selectLoading();
  categories$ = this.query.selectAll();

  /**
   * Constructor
   */
  constructor(
    protected store: ChildCategoryStore,
    protected query: ChildCategoryQuery,
    protected service: ChildCategoryService,
  ) {}

  /**
   * Get list of products
   *
   * @param  {FilterChildCategoryOptions} filters   The filters options
   * @return {Observable<CustomerMerchant[]>}
   */
  getAll(): Observable<ChildCategory[]> {
    this.store.setLoading(true);

    return this.service.getAll().pipe(
      tap((data: ChildCategory[]) =>  this.store.set(data)),
      tap(() => this.store.setLoading(false))
    );
  }

  /**
   * Get a child category
   *
   * @return {Observable<ChildCategory>}
   */
  get(id: number): Observable<ChildCategory> {
    this.store.setLoading(true);

    return this.service.get(id).pipe(
      tap((data: ChildCategory) => this.store.update(data.id, data)),
      tap(() => this.store.setLoading(false))
    );
  }

  // /**
  //  * Update user
  //  *
  //  */
  // update(item: Partial<ChildCategory>): Observable<ChildCategory> {
  //   this.store.setLoading(true);

  //   return this.service.update(item).pipe(
  //     tap((data: ChildCategory) => this.store.update(data.id, data)),
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
