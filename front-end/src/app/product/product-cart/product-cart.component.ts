import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { sumBy } from 'lodash-es';
import { CartProduct } from 'src/+state/cart-product/cart-product..model';
import { CartProductFacade } from 'src/+state/cart-product/cart-product.facade';
@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent implements OnInit {
  cart$ = this.cartProductFacade.cartProducts$;
  total = 0;
  productTotal = 0;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartProductFacade: CartProductFacade
  ) {}


  ngOnInit() {
    this.cart$.subscribe(data => {
      this.total = sumBy(data, (item) => item.quantity * item.product.price);
      this.productTotal = data.length;
    });
  }

  plusProductCart(cartProduct: CartProduct) {
    const entity = {
      ...cartProduct,
      quantity: cartProduct.quantity + 1
    };
    this.cartProductFacade.updateToCart(entity).subscribe();
  }

  subtractProductCart(cartProduct: CartProduct) {
    const entity = {
      ...cartProduct,
      quantity: cartProduct.quantity - 1
    };
    this.cartProductFacade.updateToCart(entity).subscribe();
  }

  removeItem(p: CartProduct) {
    this.cartProductFacade.deleteCartProduct(p.product.id).subscribe();
  }

}
