import { Injectable } from '@angular/core';
import { isEmpty } from 'lodash-es';
import { Observable } from 'rxjs';
import { IPagination, Pagination } from 'src/core/src/lib/models/pagination.model';
import { HttpService } from 'src/core/src/lib/utils/http/http.service';
import { santinizeObject } from 'src/core/src/lib/utils/objects';
import { API_CHILD_CATEGORY } from './child-category.constant';
import { ChildCategory } from './child-category.model';

@Injectable()
export class ChildCategoryService {
  
  /**
   * Constructor
   */
  constructor(
    private http: HttpService
  ) {}

  /**
   * Get list of items
   *
   * @return {Observable<Pagination<FilterChildCategoryOptions[]>>}
   */
  getAll(): Observable<ChildCategory[]> {
    return this.http.get(API_CHILD_CATEGORY);
  }

  
  /**
   * Get a item
   *
   * @return {Observable<Pagination<FilterChildCategoryOptions[]>>}
   */
  get(id: number): Observable<ChildCategory> {
    return this.http.get(`${API_CHILD_CATEGORY}/${id}`);
  }


  // update(item: Partial<CustomerMerchant>):Observable<CustomerMerchant> {
  //   const formData = item;
  //   return this.http.patch(`${API_CUSTOMER_MERCHANT}/update`, formData).pipe(
  //     catchError((error) => {
  //       return throwError(error);
  //     })
  //   );
  // }
}
