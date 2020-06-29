import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/+state/authentication';

@Injectable()
export class ClientGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  /**
   * Interface that a class can implement to be a guard deciding if a route can be activated.
   * If all guards return `true`, navigation will continue. If any guard returns `false`,
   * navigation will be cancelled. If any guard returns a `UrlTree`, current navigation will
   * be cancelled and a new navigation will be kicked off to the `UrlTree` returned from the
   * guard.
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.validate(route, state);
  }

  /**
   * Interface that a class can implement to be a guard deciding if a child route can be activated.
   * If all guards return `true`, navigation will continue. If any guard returns `false`,
   * navigation will be cancelled. If any guard returns a `UrlTree`, current navigation will
   * be cancelled and a new navigation will be kicked off to the `UrlTree` returned from the
   * guard.
   */
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.validate(route, state);
  }

  /**
   * Validate rights before activating components
   *
   * @param  {ActivatedRouteSnapshot} route   The activated route
   * @param  {RouterStateSnapshot} state      The router state
   * @return {boolean}
   */
  validate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authenticationService.isValid(route.data.roles)) {
      return true;
    }

    this.router.navigate(['user/login-register'], {
      queryParams: {
        returnUrl: state.url
      }
    });

    return false;
  }
}
