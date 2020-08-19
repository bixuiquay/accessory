
import { Injectable } from '@angular/core';
import { isEmpty } from 'lodash-es';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap} from 'rxjs/operators';
import { IPagination, Pagination } from 'src/core/src/lib/models/pagination.model';
import { HttpService } from 'src/core/src/lib/utils/http/http.service';
import { santinizeObject } from 'src/core/src/lib/utils/objects';
import { API_PRODUCT } from './product.constant';
import { FilterProductOptions, Product } from './product.model';


@Injectable()
export class ProductService {
  public first = "";  
  public prev = "";  
  public next = "";  
  public last = "";
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

  parseLinkHeader(header) {
    if (header.length == 0) {
      return ;
    }

    const parts = header.split(',');
    const links = {};
    parts.forEach( p => {
      const section = p.split(';');
      const url = section[0].replace(/<(.*)>/, '$1').trim();
      const name = section[1].replace(/rel="(.*)"/, '$1').trim();
      links[name] = url;

    });

    this.first  = links["first"];
    this.last   = links["last"];
    this.prev   = links["prev"];
    this.next   = links["next"]; 
  }
  // Need Thiago Preview


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

