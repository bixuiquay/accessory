import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

// import { ProductService }  from '../product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    // private service: ProductService
  ) {}


  ngOnInit() {
    // this.product$ = this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) =>
    //     this.service.getProduct(params.get('id')))
    // );
  }

}
