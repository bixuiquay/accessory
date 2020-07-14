import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { sumBy } from 'lodash-es';
import { FormGroup } from 'ngx-strongly-typed-forms';
import { CartProductFacade } from 'src/+state/cart-product/cart-product.facade';
import { InvoiceFacade } from 'src/+state/invoice/invoice.facade';
import { Invoice } from 'src/+state/invoice/invoice.model';
import { AuthService } from 'src/core/src';
import { ProductCheckoutFormFactory } from './product-checkout.form';
import { ProductCheckoutModel } from './product-checkout.model';
// import { CheckoutProduct } from 'src/+state/cart-product/cart-product..model';
// import { CheckoutProductFacade } from 'src/+state/cart-product/cart-product.facade';

declare var $: JQueryStatic;

@Component({
  selector: 'app-product-checkout',
  templateUrl: './product-checkout.component.html',
  styleUrls: ['./product-checkout.component.css']
})
export class ProductCheckoutComponent implements OnInit {

  checkoutForm: FormGroup<ProductCheckoutModel> = this.createCheckoutForm();
  cart$ = this.cartProductFacade.cartProducts$;
  total = 0;
  productTotal = 0;
  products: any[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private invoiceFacade: InvoiceFacade,
    private authService: AuthService,
    private productFormFactory: ProductCheckoutFormFactory,
    private cartProductFacade: CartProductFacade
  ) {}

  ngOnInit() {
    this.cart$.subscribe(data => {
      this.total = sumBy(data, (item) => item.quantity * item.product.price);
      this.productTotal = data.length;
      this.products = data.map(x => ({id: x.product.id, quantity: x.quantity}));
    });
    // $('#createModal').on('hidden.bs.modal', () => {
    //   console.log('============================================');
    //   self.router.navigate(['user/profile']);
    // });
  }

  createCheckoutForm() {
    const { email, address, city, firstName, lastName, phone } = this.authService.user;
    return this.productFormFactory.create({
      address: address,
      city: city,
      email: email,
      firstName: firstName,
      lastName: lastName,
      note: '',
      phone: phone,
    });
  }

  submit() {
    const formValue = this.checkoutForm.value;
    this.invoiceFacade.add({
      ...formValue,
      products: this.products
    }).subscribe(data => {
      document.getElementById("btn-modal").click();
      this.cartProductFacade.clearCart().subscribe();
      this.router.navigate(['user/profile']);
    })
  }
}
