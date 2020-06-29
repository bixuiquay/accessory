import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
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
    private productFacade: ProductFacade
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

  getClass(i) {
    return i === 0 ? 'first' : '';
  }
}
