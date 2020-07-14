import { Injectable } from '@angular/core';
import { isEmpty } from 'lodash-es';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IPagination, Pagination } from 'src/core/src/lib/models/pagination.model';
import { HttpService } from 'src/core/src/lib/utils/http/http.service';
import { santinizeObject } from 'src/core/src/lib/utils/objects';
import { API_INVOICE } from './invoice.constant';
import { Invoice } from './invoice.model';

@Injectable()
export class InvoiceService {
  
  /**
   * Constructor
   */
  constructor(
    private http: HttpService
  ) {}

  /**
   * Get list of items
   *
   * @return {Observable<Pagination<FilterInvoiceOptions[]>>}
   */
  getAll(): Observable<Invoice[]> {
    return this.http.get(API_INVOICE);
  }

  
  /**
   * Get a item
   *
   * @return {Observable<Pagination<FilterInvoiceOptions[]>>}
   */
  get(id: number): Observable<Invoice> {
    return this.http.get(`${API_INVOICE}/${id}`);
  }

  /**
   * Get a item
   *
   * @return {Observable<Pagination<FilterInvoiceOptions[]>>}
   */
  getMine(filter): Observable<any> {
    return this.http.get(`${API_INVOICE}/mine`, { params: santinizeObject(filter) });
  }


  add(item: Partial<Invoice>):Observable<Invoice> {
    const formData = item;
    return this.http.post(`${API_INVOICE}`, formData).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }
}
