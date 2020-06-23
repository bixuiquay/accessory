// angular
import { Injectable } from '@angular/core';
import { isMobile, isObject } from '../utils';

@Injectable()
export class WindowPlatformService {
  navigator: any = {};
  location: any = {};
  localStorage: any;
  process: any;
  require: any;

  alert(msg: any) { }

  confirm(msg: any) { }

  setTimeout(handler: (...args: any[]) => void, timeout?: number) {
    return 0;
  }

  clearTimeout(timeoutId: number) { }

  setInterval(handler: (...args: any[]) => void, ms?: number, ...args: any[]) {
    return 0;
  }

  clearInterval(intervalId: number) { }

  // ...You can expand support for more window methods as you need them here...
}

@Injectable()
export class WindowService {
  constructor(private platformWindow: WindowPlatformService) { }

  get navigator() {
    return this.platformWindow.navigator;
  }

  get location() {
    return this.platformWindow.location;
  }

  get process() {
    return this.platformWindow.process;
  }

  get require() {
    return this.platformWindow.require;
  }

  alert(msg: any): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.platformWindow.alert(msg);
        return resolve();
      } catch (error) {
        return reject(error);
      }
    });
  }

  confirm(msg: any, action?: Function /* used for fancyalerts on mobile*/ ): Promise<any> {
    return new Promise((resolve, reject) => {
      const result: any = (<any>this.platformWindow).confirm(msg, isMobile() ? action : undefined);

      if (isObject(result) && result.then) {
        result.then(resolve, reject);
      }
      else if (result) {
        resolve();
      }
      else {
        reject();
      }
    });
  }

  setTimeout(handler: (...args: any[]) => void, timeout?: number): number {
    return this.platformWindow.setTimeout(handler, timeout);
  }

  clearTimeout(timeoutId: number): void {
    return this.platformWindow.clearTimeout(timeoutId);
  }

  setInterval(handler: (...args: any[]) => void, ms?: number, ...args: any[]): number {
    return this.platformWindow.setInterval(handler, ms, args);
  }

  clearInterval(intervalId: number): void {
    return this.platformWindow.clearInterval(intervalId);
  }
}
