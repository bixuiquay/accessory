import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from 'ngx-strongly-typed-forms';
import { LoginModel } from 'src/+state/authentication';
import { WebForm } from 'src/core/src/lib/services/form';

@Injectable()
export class LoginFormFactory extends WebForm<
LoginModel
> {
  create({
    email,
    password
  }: LoginModel): FormGroup<LoginModel> {
    const form = new FormGroup<LoginModel>({
      email: new FormControl<string>(email),
      password: new FormControl<string>(password)
    });

    form.clearValidators();

    return form;
  }
}
