import { CommonModule }   from '@angular/common';
import { NgModule }       from '@angular/core';
import { FormsModule }    from '@angular/forms';

import { ProductDetailComponent }  from './product-detail/product-detail.component';
import { ProductListComponent }    from './product-list/product-list.component';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { ProductRoutingModule } from './product-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ProductRoutingModule,
    TabsModule
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductCategoryComponent
  ]
})
export class ProductModule {}
