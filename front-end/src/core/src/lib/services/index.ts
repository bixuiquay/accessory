import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService, TokenInterceptor } from './auth';
import { LogService } from './log.service';
import { TimezoneOffsetInterceptor } from './timezone-offset.interceptor';
import { WindowService } from './window.service';

export const CORE_PROVIDERS: any[] = [
  LogService,
  WindowService,
  AuthService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TimezoneOffsetInterceptor,
    multi: true
  }
];

export * from './log.service';
export * from './window.service';
export * from './tokens';
export * from './auth';
export * from './timezone-offset.interceptor';
