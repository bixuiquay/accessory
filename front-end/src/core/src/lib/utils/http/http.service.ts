import { HttpClient, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SERVICE_UNAVAILABLE } from 'http-status-codes';
import { get, merge } from 'lodash';
import * as queryString from 'query-string';
import { Observable, of, throwError } from 'rxjs';
import { concat, delay, flatMap, retryWhen, take } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ApiUrlToken } from '../../services/tokens';

@Injectable()
export class HttpService {
  domain: string = this.apiUrl;
  polling: number = environment.api.polling;
  retry: number = environment.api.retry;

  /**
   * Constructor
   */
  constructor(
    protected httpClient: HttpClient,
    protected translate: TranslateService,
    @Inject(ApiUrlToken) protected apiUrl: string
  ) {}

  /**
   * Set default domain with culture(language) for request
   *
   * @param  {string} domain  The domain url "http://<domain>/<culture>/""
   * @return {void}
   */
  setDomain(domain: string): void {
    this.domain = domain;
  }

  /**
   * Performs a request with GET http method.
   * Retry if status is 503 or 0
   *
   * @param  {string} url                   The endpoint
   * @param  {any} options   The request options
   * @return {Observable<any>}         The response in Observable
   */
  get<T>(url: string, options?: any): Observable<any> {
    return this.httpClient.get<T>(this.buildUrl(url, options), this.buildOptions(options))
      .pipe(
        retryWhen((error$: Observable<any>) => {
          return error$.pipe(
            flatMap((error: any) => {
              return (!error.status || error.status === SERVICE_UNAVAILABLE)
                ? of(error.status).pipe(delay(this.polling))
                : throwError(error);
            }),
            take(this.retry),
            concat(throwError({ error: `Sorry, there was an error (after ${this.retry} retries)` }))
          )
        })
      );
  }

  /**
   * Performs a request with POST http method.
   *
   * @param  {string} url                   The endpoint
   * @param  {FormData|any} body            The body content
   * @param  {any} options   The request options
   * @return {Observable<any>}         The response in Observable
   */
  post<T>(url: string, body: FormData | any, options?: any): Observable<any> {
    return this.httpClient.post<T>(this.buildUrl(url), body, this.buildOptions(options));
  }

  /**
   * Performs a request with PUT http method.
   *
   * @param  {string} url                         The endpoint
   * @param  {FormData|any} body                  The body content
   * @param  {any} options   The request options
   * @return {Observable<any>}                    The response in Observable
   */
  put<T>(url: string, body: FormData | any, options?: any): Observable<any> {
    return this.httpClient.put<T>(this.buildUrl(url), body, this.buildOptions(options));
  }

  /**
   * Performs a request with PATCH http method.
   *
   * @param  {string} url                         The endpoint
   * @param  {FormData|any} body                  The body content
   * @param  {any} options   The request options
   * @return {Observable<any>}                    The response in Observable
   */
  patch<T>(url: string, body: FormData | any, options?: any): Observable<any> {
    return this.httpClient.patch<T>(this.buildUrl(url), body, this.buildOptions(options));
  }

  /**
   * Performs a request with DELETE http method.
   *
   * @param  {string} url                         The endpoint
   * @param  {any} options   The request options
   * @return {Observable<any>}                    The response in Observable
   */
  delete<T>(url: string, options?: any): Observable<any> {
    const deleteOptions = this.buildOptions(merge(options, { observe: 'response', responseType: 'text' }));

    return this.httpClient.delete<T>(this.buildUrl(url), deleteOptions);
  }

  /**
   * Performs a dynamic request
   *
   * @param  {HttpRequest} request                The HttpRequest
   * @return {Observable<any>}                    The response in Observable
   */
  request(request: HttpRequest<any>): Observable<any> {
    return this.httpClient.request(request);
  }

  /**
   * Get domain with language
   *
   * @return {string}
   */
  private get domainWithLang(): string {
    //return `${this.domain}/${this.language}`;
    return `${this.domain}`;
  }

  /**
   * Get current language
   *
   * @return {string} The active language
   */
  private get language(): string {
    const langs = { en: 'en-US', de: 'de-CH' };

    return langs[this.translate.currentLang];
  }

  /**
   * Build request url with set domain
   *
   * @param  {string} endpoint    The endpoint
   * @return {string}             The full endpoint
   */
  private buildUrl(endpoint: string, options: any = {}): string {
    const { noCache } = options;
    const url = endpoint.includes('http') ? endpoint : `${this.domainWithLang}${endpoint}`;

    return noCache ? `${url}?t=${new Date().getTime()}` : url;
  }

  /**
   * Build request options
   *
   * @param  {any} options The request options
   * @return {any}         The enhanced request options
   */
  private buildOptions(options?: any): any {
    const headers = this.buildHeaders(get(options, 'headers'));
    const newOptions = { ...options, headers };

    return newOptions;
  }

  /**
   * Build request headers
   *
   * @param  {Headers} initHeaders  The init headers
   * @return {Headers}              The request headers
   */
  private buildHeaders(initHeaders: Headers): Headers {
    const headers = new Headers(initHeaders || {});

    this.addAcceptHeader(headers);

    return headers;
  }

  /**
   * Add Accept header
   *
   * @param  {Headers} headers  The request headers
   * @return {void}
   */
  private addAcceptHeader(headers: Headers): void {
    headers.append('accept', 'application/json');
    headers.append('content-type', 'application/json');
  }
}
