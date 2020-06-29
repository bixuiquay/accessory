import { FormGroup } from "ngx-strongly-typed-forms";
// import { ErrorStateMatcher, ErrorStateMatcherService, ParentErrorStateMatcherService } from "./error-state-matcher.service";

export abstract class WebForm<T> {
  /**
   * Create strongly typed form
   *
   * @param  {any} model    The model
   * @return {FormGroup<T>}
   */
  abstract create(model: T, options?: any): FormGroup<T>

  /**
   * Create Angular Material ErrorStateMatcher
   * https://stackblitz.com/angular/voepaombnnb?file=app%2Finput-error-state-matcher-example.ts
   *
   * @return {ErrorStateMatcher}
   */
  // public createErrorStateMatcher(): ErrorStateMatcher {
  //   return new ErrorStateMatcherService();
  // }

  /**
   * Create Angular Material ErrorStateMatcher
   * https://stackblitz.com/angular/voepaombnnb?file=app%2Finput-error-state-matcher-example.ts
   *
   * @return {ErrorStateMatcher}
   */
  // public createParentErrorStateMatcher(): ErrorStateMatcher {
  //   return new ParentErrorStateMatcherService();
  // }
}