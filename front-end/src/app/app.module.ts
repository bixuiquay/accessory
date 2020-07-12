import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// tslint:disable-next-line:ordered-imports
import { Router, RouterModule } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxPermissionsModule } from 'ngx-permissions';
import { AuthenticationStateModule } from 'src/+state/authentication';
import { CartProductStateModule } from 'src/+state/cart-product/cart-product..state';
import { CategoryStateModule } from 'src/+state/category/category.state';
import { ChildCategoryStateModule } from 'src/+state/child-category/child-category.state';
import { ProductStateModule } from 'src/+state/product/product.state';
import { CoreModule } from 'src/core/src/lib/core.module';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppNavComponent } from './app-nav/app-nav.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductModule } from './product/product.module';

@NgModule({
  declarations: [
    AppComponent,
    AppNavComponent,
    AppHeaderComponent,
    AppFooterComponent
  ],
  imports: [
    BsDropdownModule.forRoot(),
    CartProductStateModule.forChild(),
    AuthenticationStateModule.forChild(),
    TabsModule.forRoot(),
    ProductStateModule.forChild(),
    CategoryStateModule.forChild(),
    ChildCategoryStateModule.forChild(),
    AppRoutingModule,
    ProductModule,
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
     /* Routing */
    RouterModule,
    HttpClientModule,
    NgxPermissionsModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router) {
  }
}
