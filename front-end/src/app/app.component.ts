import { Component, OnInit } from '@angular/core';
import { Product, ProductFacade } from 'src/+state/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'front-end';
  products: Product[];

  constructor(
    private productFacade: ProductFacade
  ){}

  // product$ = this.productFacade.product$;
  ngOnInit(): void {
    const filter = {
      brandId: 1,
      page: 1,
      limit: 10
    };
    this.productFacade.getAll(filter).subscribe(data => {
      this.products = data.items;
      console.log('data.items: ', data.items);
    });
  }
}
