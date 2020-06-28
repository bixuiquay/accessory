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
  ){}

  // product$ = this.productFacade.product$;
  ngOnInit(): void {
  }
}
