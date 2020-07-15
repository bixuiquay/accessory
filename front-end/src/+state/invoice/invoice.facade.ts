import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Invoice } from './invoice.model';
import { InvoiceQuery } from './invoice.query'
import { InvoiceService } from './invoice.service'
import { InvoiceStore } from './invoice.store'

@Injectable()
export class InvoiceFacade {
  loading$ = this.query.selectLoading();
  invoices$ = this.query.selectAll();

  /**
   * Constructor
   */
  constructor(
    protected store: InvoiceStore,
    protected query: InvoiceQuery,
    protected service: InvoiceService,
  ) {}

  /**
   * Get list of products
   *
   * @param  {FilterInvoiceOptions} filters   The filters options
   * @return {Observable<CustomerMerchant[]>}
   */
  getAll(): Observable<Invoice[]> {
    this.store.setLoading(true);

    return this.service.getAll().pipe(
      tap((data: Invoice[]) =>  this.store.set(data)),
      tap(() => this.store.setLoading(false))
    );
  }

  /**
   * Get a child category
   *
   * @return {Observable<Invoice>}
   */
  get(id: number): Observable<Invoice> {
    this.store.setLoading(true);

    return this.service.get(id).pipe(
      tap((data: Invoice) => this.store.update(data.id, data)),
      tap(() => this.store.setLoading(false))
    );
  }

  /**
   * add invoice
   *
   */
  add(item: Partial<Invoice>): Observable<Invoice> {
    this.store.setLoading(true);

    return this.service.add(item).pipe(
      tap((data: Invoice) => this.store.add(data)),
      tap(() => this.store.setLoading(false))
    )
  }

  getMine(filter) {
    this.store.setLoading(true);
    return this.service.getMine(filter).pipe(
      tap((data: any) =>  this.store.set(data.items)),
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
