import { Injectable } from "@angular/core";
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, throwError } from "rxjs";
import { tap } from "rxjs/operators";
import { Authentication, ChangePasswordModel, LoginModel, UserInfo } from "./authentication.model";
import { HttpService, AuthService } from 'src/core/src';
import { API_CLIENT_AUTHENTICATION, API_CLIENT_LOGIN } from './authentication.constant';

@Injectable()
export class AuthenticationService {
  static KEY_TOKEN = 'token';
  static KEY_USER = 'user';

  /**
   * Constructor
   */
  constructor(
    private http: HttpService,
    private jwtHelperService: JwtHelperService,
    private authService: AuthService
  ) {}

  /**
   * Handle login
   *
   * @param  {LoginModel} login   The login info
   * @return {Observable<Authentication>}
   */
  clientLogin(login: LoginModel): Observable<Authentication> {
    return this.http.post(API_CLIENT_LOGIN, login)
      .pipe(
        tap((data) => {
          const { access_token, cart, user } = data;
          this.authService.token = access_token;
          this.authService.user = user;
          this.authService.cart = cart;
        })
      );
  }

  /**
   * Handle logout
   *
   * @return {Observable<string>}   The username name that performed log out
   */
  logout(): Observable<string> {
    return new Observable(observer => {
      const { username } = this.authService.user;

      this.authService.token = null;
      this.authService.user = null;
      this.authService.cart = null;

      observer.next(username);
    });
  }

  /**
   * Change password
   *
   * @param  {ChangePasswordModel} model    The model
   * @return {Observable<boolean>}
   */
  // changePassword(model: ChangePasswordModel): Observable<boolean> {
  //   if (model) {
  //     return this.http.post(API_CHANGE_PASSWORD, model);
  //   }

  //   return throwError(new Error(`Model is not valid! >>> ${model}`));
  // }

  /**
   * Check is authenticated or not
   *
   * @return {boolean}
   */
  isValid(roles: any[]): boolean {
    const token: string = this.getToken();
    const tokenExpired: boolean = this.jwtHelperService.isTokenExpired(token);
    const user: string = this.authService.user;

    return (!!token && !tokenExpired && !!user);
  }

  /**
   * Check is authenticated or not
   *
   * @return {boolean}
   */
  isValidRole(roles: any[]): boolean {

    const user: any = this.authService.user;
    const features = user.features;
    
    let validResult = false;

    roles.forEach(role => {
      if(features.includes(role)) {
        validResult = true;
      }
    });

    return validResult;
  }

  /**
   * Get token
   *
   * @return {string}
   */
  getToken(): string {
    return this.jwtHelperService.tokenGetter();
  }

  /**
   * Get user info
   *
   * @return {UserInfo}
   */
  getUser(): UserInfo {
    return this.authService.user;
  }

  /**
   * Decode token
   *
   * @param  {string} token    The token
   * @return {any}             The decoded token
   */
  private decodeToken(token: string): any {
    return this.jwtHelperService.decodeToken(token);
  }
}