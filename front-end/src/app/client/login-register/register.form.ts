import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "ngx-strongly-typed-forms";
import { RegisterModel } from "src/+state/authentication";
import { WebForm } from "src/core/src/lib/services/form";

@Injectable()
export class RegisterFormFactory extends WebForm<RegisterModel> {
  create({ email, password, retryPassword }: RegisterModel): FormGroup<RegisterModel> {
    const form = new FormGroup<RegisterModel>({
      email: new FormControl<string>(email),
      password: new FormControl<string>(password),
      retryPassword: new FormControl<string>(retryPassword)
    });

    form.clearValidators();

    return form;
  }
}
