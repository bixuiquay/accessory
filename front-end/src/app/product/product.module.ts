import { CommonModule }   from '@angular/common';
import { NgModule }       from '@angular/core';

import { ProductDetailComponent }  from './product-detail/product-detail.component';
import { ProductListComponent }    from './product-list/product-list.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ClientGuard } from '../client/services/guard/client.guard';
import { ProductCartComponent } from './product-cart/product-cart.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { ProductCheckoutComponent } from './product-checkout/product-checkout.component';
import { ProductCheckoutFormFactory } from './product-checkout/product-checkout.form';
import { ProductComponent } from './product-component/product.component';
import { ProductRoutingModule } from './product-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProductRoutingModule,
    TabsModule
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductCategoryComponent,
    ProductComponent,
    ProductCartComponent,
    ProductCheckoutComponent
  ],
  providers: [
    ClientGuard,
    ProductCheckoutFormFactory,
  ]
})
export class ProductModule {}
