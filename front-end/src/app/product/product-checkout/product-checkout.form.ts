import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from 'ngx-strongly-typed-forms';
import { WebForm } from 'src/core/src/lib/services/form';
import { ProductCheckoutModel } from './product-checkout.model';

@Injectable()
export class ProductCheckoutFormFactory extends WebForm<
ProductCheckoutModel
> {
  create({
    address,
    city,
    email,
    firstName,
    lastName,
    note,
    phone
  }: ProductCheckoutModel): FormGroup<ProductCheckoutModel> {
    const form = new FormGroup<ProductCheckoutModel>({
      address: new FormControl<string>(address),
      city: new FormControl<string>(city),
      firstName: new FormControl<string>(firstName),
      lastName: new FormControl<string>(lastName),
      note: new FormControl<string>(note),
      phone: new FormControl<string>(phone),
      email: new FormControl<string>(email),
    });

    form.clearValidators();

    return form;
  }
}
