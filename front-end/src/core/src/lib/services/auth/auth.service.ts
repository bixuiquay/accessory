import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  static KEY_TOKEN = 'token';
  static KEY_USER = 'user';
  static tokenGetter(): string {
    return localStorage.getItem(AuthService.KEY_TOKEN);
  }

  constructor() { }

  /**
   * Token getter
   */
  get token(): string {
    return this.getItem(AuthService.KEY_TOKEN);
  }

  /**
   * Token setter
   */
  set token(token: string) {
    this.setItem(AuthService.KEY_TOKEN, token);
  }

  /**
   * User getter
   */
  get user(): any {
    return this.getItem(AuthService.KEY_USER);
  }

  /**
   * User setter
   */
  set user(user: any) {
    this.setItem(AuthService.KEY_USER, user);
  }

  /**
   * Get local storage item
   *
   * @param  {string} key     The item key
   * @return {any}            The item value
   */
  private getItem(key: string): any {
    const data = localStorage.getItem(key);
    return JSON.parse(data);
  }

  /**
   * Set local storage item
   *
   * @param  {string} key     The item key
   * @param  {any} value      The item value
   * @return {void}
   */
  private setItem(key: string, value: any): void {
    if (!value) {
      this.removeItem(key);
    }
    else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  /**
   * Remove local storage item
   *
   * @param  {string} key     The item key
   * @return {void}
   */
  private removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}