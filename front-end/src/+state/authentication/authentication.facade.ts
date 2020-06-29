import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Authentication, ChangePasswordModel, LoginModel, UserInfo } from "./authentication.model";
import { AuthenticationQuery } from "./authentication.query";
import { AuthenticationService } from "./authentication.service";
import { AuthenticationStore } from "./authentication.store";

@Injectable()
export class AuthenticationFacade {
  authenticationList$ = this.query.selectAll();
  authentication$ = this.query.selectActive();
  authenticationId$ = this.query.selectActiveId();
  count$ = this.query.selectCount();
  loading$ = this.query.selectLoading();

  /**
   * Constructor
   */
  constructor(
    protected store: AuthenticationStore,
    protected query: AuthenticationQuery,
    protected service: AuthenticationService
  ) {}

  /**
   * Get user info
   *
   * @return {UserInfo}
   */
  getUser(): UserInfo {
    return this.service.getUser();
  }

  /**
   * Login
   *
   * @param  {LoginModel} model   The login model
   * @return {Observable<Authentication>}
   */
  login(model: LoginModel): Observable<Authentication> {
    this.store.setLoading(true);

    return this.service.clientLogin(model).pipe(
      tap(() => this.store.setLoading(false))
    );
  }

  /**
   * Logout
   *
   * @return {Observable<string>}
   */
  logout(): Observable<string> {
    this.store.setLoading(true);

    return this.service.logout().pipe(
      tap(() => this.store.setLoading(false))
    );
  }

  /**
   * Change password
   *
   * @param  {ChangePasswordModel} model  The change password model
   * @return {Observable<boolean>}
   */
  // changePassword(model: ChangePasswordModel): Observable<boolean> {
  //   this.store.setLoading(true);

  //   return this.service.changePassword(model).pipe(
  //     tap(() => this.store.setLoading(false))
  //   );
  // }
}