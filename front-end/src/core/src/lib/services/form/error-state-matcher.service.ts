// import { FormControl, FormGroupDirective, NgForm } from "@angular/forms";
// import {ErrorStateMatcher as BaseErrorStateMatcher} from '@angular/material/core';

// export class ErrorStateMatcher extends BaseErrorStateMatcher {}

// /**
//  * Provider that defines how form controls behave with regards to displaying error messages.
//  */
// export class ErrorStateMatcherService implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     const invalidControl = !!(control && control.invalid && (control.dirty || isSubmitted));

//     return invalidControl;
//   }
// }

// /**
//  * Provider that defines how form controls behave with regards to displaying error messages.
//  */
// export class ParentErrorStateMatcherService implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     const parent = control && control.parent;
//     const dirtyControl = !!(control && control.dirty);
//     const invalidParent = !!(parent && parent.invalid && (parent.dirty || isSubmitted));

//     return dirtyControl && invalidParent;
//   }
// }

