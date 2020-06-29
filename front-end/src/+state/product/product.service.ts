import { Injectable } from '@angular/core';
import { isEmpty } from 'lodash-es';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
    return this.http.get(API_PRODUCT, { params: santinizeObject(filter) });
  }

  get(id:string):Observable<Product> {
    return this.http.get(`${API_PRODUCT}/${id}`).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }
}
