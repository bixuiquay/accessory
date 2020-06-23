import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TimezoneOffsetInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        'X-Timezone-Offset': this.getTimezoneOffset(),
      }
    });

    return next.handle(request);
  }

  private getTimezoneOffset() : string {
    const timezoneOffset = new Date().getTimezoneOffset();

		return String(timezoneOffset);
	}
}
