// TODO: Feature Componetized like CrisisCenter
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Product, ProductFacade } from 'src/+state/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  featuredProducts: Product[];
  wishlistProducts: Product[];
  saleProducts: Product[];
  constructor(
    private productFacade: ProductFacade,
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
}
