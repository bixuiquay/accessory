import { Injectable } from '@angular/core';
import { isEmpty } from 'lodash-es';
import { Observable } from 'rxjs';
import { IPagination, Pagination } from 'src/core/src/lib/models/pagination.model';
import { HttpService } from 'src/core/src/lib/utils/http/http.service';
import { santinizeObject } from 'src/core/src/lib/utils/objects';
import { API_CATEGORY } from './category.constant';
import { Category, FilterCategoryOptions } from './category.model';

@Injectable()
export class CategoryService {
  
  /**
   * Constructor
   */
  constructor(
    private http: HttpService
  ) {}

  /**
   * Get list of items
   *
   * @return {Observable<Pagination<FilterCategoryOptions[]>>}
   */
  getAll(): Observable<Category[]> {
    return this.http.get(API_CATEGORY);
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
