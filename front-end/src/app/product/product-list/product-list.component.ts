// TODO: Feature Componetized like CrisisCenter
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ProductFacade } from 'src/+state/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(
    private productFacade: ProductFacade,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const filter = {
      page: 1,
      limit: 6
    }
    // this.productFacade.getAll({
    //   isFeatured
    // })
  }
}
