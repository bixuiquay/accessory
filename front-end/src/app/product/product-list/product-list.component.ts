// TODO: Feature Componetized like CrisisCenter
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { AuthenticationFacade } from 'src/+state/authentication';
import { CartProduct } from 'src/+state/cart-product/cart-product..model';
import { CartProductFacade } from 'src/+state/cart-product/cart-product.facade';
import { Product, ProductFacade } from 'src/+state/product';
import { AuthService } from 'src/core/src';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  featuredProducts: Product[];
  wishlistProducts: Product[];
  saleProducts: Product[];
  exitedProducts = [];
  constructor(
    private productFacade: ProductFacade,
    private authService: AuthService,
    private cartProductFacade: CartProductFacade,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const filter = {
      page: 1,
      limit: 6
    };
    combineLatest([this.productFacade.getAll({
      ...filter,
      isFeatured: true
    }), this.productFacade.getAll({
      ...filter,
      isWishlist: true
    }), this.productFacade.getAll({
      ...filter,
      isFlashSale: true
    })
    ]).subscribe(([featuredProducts, wishlistProducts, saleProducts]) => {
      this.featuredProducts = featuredProducts.items;
      this.wishlistProducts = wishlistProducts.items;
      this.saleProducts = saleProducts.items;
    })
  }

  getProductClass(index) {
    switch(index) {
      case 0:
      case 2:
        return 'product first';
      case 1:
      case 4:
        return 'product';
      case 3:
      case 5:
        return 'product last';
    }
  }

  formatMoney(price) {
    console.log(new Intl.NumberFormat('vn-VN', { maximumSignificantDigits: 3 }).format(price));
    return new Intl.NumberFormat('vn-VN', { maximumSignificantDigits: 3 }).format(price)
  }

  addToCart(product: Product) {
    const data = this.cartProductFacade.getExitedProduct(product.id);
    this.exitedProducts.push(data);
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
}