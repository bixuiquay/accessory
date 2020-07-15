import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientGuard } from '../client/services/guard/client.guard';
import { ProductCartComponent } from './product-cart/product-cart.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { ProductCheckoutComponent } from './product-checkout/product-checkout.component';
import { ProductComponent } from './product-component/product.component';
import { ProductDetailComponent }  from './product-detail/product-detail.component';
import { ProductListComponent }    from './product-list/product-list.component';

const productRoutes: Routes = [
  { path: '', redirectTo: 'product', pathMatch: 'full'},
  {
    path: 'product',
    component: ProductComponent,
    children: [
      {
        path: '',
        component: ProductListComponent,
      },
      { 
        path: 'cart', component: ProductCartComponent, canActivate: [ClientGuard]
      },
      {
        path: 'checkout',
        component: ProductCheckoutComponent,
        canActivate: [ClientGuard]
      },
      { path: 'category/:id', component: ProductCategoryComponent },
      {
        path: ':id',
        component: ProductDetailComponent,
      },
    ]
  },
  // { path: '', redirectTo: 'product', pathMatch: 'full'},
  // { path: 'product',  component: ProductListComponent },
  // { path: 'category/:id', component: ProductCategoryComponent },
  // { path: 'product/:id', component: ProductDetailComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(productRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProductRoutingModule { }
