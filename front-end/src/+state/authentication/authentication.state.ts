import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthenticationFacade } from './authentication.facade';
import { AuthenticationQuery } from './authentication.query';
import { AuthenticationService } from './authentication.service';
import { AuthenticationStore } from './authentication.store';
import { AuthService, ApiUrlToken, environment, HttpService, throwIfAlreadyLoaded } from 'src/core/src';

export function jwtTokenGetter(): string {
  return AuthService.tokenGetter();
}

@NgModule({
  imports:[
    /**
     * Json Web Token config
     *
     * Link ref: https://github.com/auth0/angular2-jwt
     */
    JwtModule.forRoot({
      config: {
        tokenGetter: jwtTokenGetter
      }
    })
  ],
  providers: [
    {
      provide: ApiUrlToken,
      useValue: environment.api.urls.accessoryUrl,
    },
    HttpService,
    AuthenticationFacade,
    AuthenticationQuery,
    AuthenticationService,
    AuthenticationStore
  ]
})
export class AuthenticationStateModule {
  static forChild(): ModuleWithProviders {
    return {
      ngModule: AuthenticationStateModule,
      providers: [
        {
          provide: ApiUrlToken,
          useValue: environment.api.urls.accessoryUrl,
        },
        HttpService,
        AuthenticationFacade,
        AuthenticationQuery,
        AuthenticationService,
        AuthenticationStore
      ]
    };
  }

  constructor(
    @Optional()
    @SkipSelf()
    parentModule: AuthenticationStateModule,
  ) {
    throwIfAlreadyLoaded(parentModule, 'AuthenticationModule');
  }
}
