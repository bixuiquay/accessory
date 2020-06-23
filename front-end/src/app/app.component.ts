import { Component, OnInit } from '@angular/core';
import { CategoryFacade } from 'src/+state/category';
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
    private productFacade: ProductFacade,
    private categoryFacade: CategoryFacade
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
    this.categoryFacade.getAll().subscribe();
  }
}
