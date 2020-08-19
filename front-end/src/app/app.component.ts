import { Component, OnInit } from '@angular/core';
import { AuthenticationFacade } from 'src/+state/authentication';
import { Product } from 'src/+state/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front-end';
  products: Product[];

  user$ = this.authFacade.getUser();

  constructor(
    private authFacade: AuthenticationFacade,
  ){
  }

  // product$ = this.productFacade.product$;
  
  
}
