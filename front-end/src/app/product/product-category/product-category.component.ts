import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CartProduct } from 'src/+state/cart-product/cart-product..model';
import { CartProductFacade } from 'src/+state/cart-product/cart-product.facade';
import { Category, CategoryFacade } from 'src/+state/category';
import { ChildCategory, ChildCategoryFacade } from 'src/+state/child-category';
import { Product, ProductFacade } from 'src/+state/product';
import { Pagination } from 'src/core/src';


// import { ProductService }  from '../product.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {
  products$: Observable<Pagination<Product>>;
  selectedCategory$:  Observable<ChildCategory>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productFacade: ProductFacade,
    private cartProductFacade: CartProductFacade,
    private childCategoryFacade: ChildCategoryFacade
  ) {}


  ngOnInit() {
    const page = 1;
    const limit = 8;
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.products$ = this.productFacade.getAll({
        page,
        limit,
        childCategoryId: Number(params.get('id'))
      });

      // this.childCategoryFacade.get(Number(params.get('id')))
    });
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


}
