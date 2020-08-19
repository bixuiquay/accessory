import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CartProduct } from 'src/+state/cart-product/cart-product..model';
import { CartProductFacade } from 'src/+state/cart-product/cart-product.facade';
import { Product, ProductFacade } from 'src/+state/product';

// import { ProductService }  from '../product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product$: Observable<Product>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productFacade: ProductFacade,
    private cartProductFacade: CartProductFacade,
  ) {}


  ngOnInit() {
    this.product$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.productFacade.get(params.get('id')))
    );

    this.product$.subscribe(data => {
      console.log('detail product: ', data);
    })
  }

  addToCart(product: Product) {
    const data = this.cartProductFacade.getExitedProduct(product.id);
    if (data) {
        const q = data.quantity +1;

        const updateEntity = {...data, quantity: q }
        this.cartProductFacade.updateToCart(updateEntity).subscribe();
    } else {
      const cartProduct: CartProduct = {
        product,
        quantity: 1,

      }
      this.cartProductFacade.addToCart(cartProduct).subscribe();
    }
  }

  getClass(i) {
    return i === 0 ? 'first' : '';
  }
}
