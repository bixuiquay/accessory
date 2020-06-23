import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthorizationInterceptor as Authorization } from './authorization.interceptor';

export const AuthorizationInterceptor = {
  provide: HTTP_INTERCEPTORS,
  useClass: Authorization,
  multi: true
};