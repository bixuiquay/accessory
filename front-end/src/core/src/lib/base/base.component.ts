import { OnDestroy } from '@angular/core';

// libs
import { MonoTypeOperatorFunction, OperatorFunction, Subject, throwError } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';

export interface CleanupOptions {
  errors: boolean;
}

const defaultCleanupOptions: CleanupOptions = {
  errors: true
}

export abstract class BaseComponent implements OnDestroy {
  public destroy$: Subject<boolean> = new Subject();
  public error$: Subject<Error | Error[]> = new Subject();

  /**
   * Get current timestamp
   */
  get now() {
    return new Date()
  }

  /**
   * Next destroy$ value when component is being destroyed
   *
   * @return {void}
   */
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  /**
   * Clear errors
   *
   * @return {void}
   */
  clearErrors(): void {
    this.error$.next();
  }

  /**
   * Auto cleanup by take until component is destroyed
   *
   * @param  {boolean} cleanErrors  To auto clean errors
   * @return {MonoTypeOperatorFunction<T>}
   */
  autoCleanUp<T>({ errors }: CleanupOptions = defaultCleanupOptions): MonoTypeOperatorFunction<T> {
    errors && this.error$.next();

    return takeUntil<T>(this.destroy$);
  }

  /**
   * Auto catch errors
   *
   * @param  {Function} callback  The callback
   * @return {OperatorFunction<T>}
   */
  autoCatchError<T>(callback?: Function): OperatorFunction<T, any> {
    return catchError<T, any>((error: any) => {
      console.log('error: ', error);

      this.error$.next(error);

      typeof callback === 'function' && callback(error);

      return throwError(error);
    });
  }
}
