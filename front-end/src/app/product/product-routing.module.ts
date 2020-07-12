import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductCartComponent } from './product-cart/product-cart.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { ProductDetailComponent }  from './product-detail/product-detail.component';
import { ProductListComponent }    from './product-list/product-list.component';

const productRoutes: Routes = [
  { path: 'product',  component: ProductListComponent },
  { path: 'category/:id', component: ProductCategoryComponent },
  { path: 'product/:id', component: ProductDetailComponent},
  { path: 'cart', component: ProductCartComponent},
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