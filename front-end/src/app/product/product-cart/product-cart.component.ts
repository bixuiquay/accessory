import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CartProduct } from 'src/+state/cart-product/cart-product..model';
import { CartProductFacade } from 'src/+state/cart-product/cart-product.facade';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent implements OnInit {
  cart$ = this.cartProductFacade.cartProducts$;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartProductFacade: CartProductFacade
  ) {}


  ngOnInit() {
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
}
