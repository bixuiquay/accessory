import { Injectable } from '@angular/core';
import { isEmpty } from 'lodash-es';
import { Observable } from 'rxjs';
import { IPagination, Pagination } from 'src/core/src/lib/models/pagination.model';
import { HttpService } from 'src/core/src/lib/utils/http/http.service';
import { santinizeObject } from 'src/core/src/lib/utils/objects';
import { API_PRODUCT } from './product.constant';
import { FilterProductOptions, Product } from './product.model';

@Injectable()
export class ProductService {
  
  /**
   * Constructor
   */
  constructor(
    private http: HttpService
  ) {}

  /**
   * Get list of items
   *
   * @return {Observable<Pagination<FilterProductOptions[]>>}
   */
  getAll(filter: FilterProductOptions): Observable<Pagination<Product>> {
    // if (isEmpty(filter)) {
    //   filter.sortBy= 'updatedAt';
    //   filter.sortDir = 'desc';
      
    // }

    return this.http.get(API_PRODUCT, { params: santinizeObject(filter) });
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
