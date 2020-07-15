import { BrowserModule } from '@angular/platform-browser';

import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeFr from '@angular/common/locales/fr';
import { LOCALE_ID, NgModule } from '@angular/core';
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
import { InvoiceStateModule } from 'src/+state/invoice/invoice.state';
import { ProductStateModule } from 'src/+state/product/product.state';
import { CoreModule } from 'src/core/src/lib/core.module';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppNavComponent } from './app-nav/app-nav.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientGuard } from './client/services/guard/client.guard';
registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    AppNavComponent,
    AppHeaderComponent,
    AppFooterComponent,
  ],
  imports: [
    InvoiceStateModule.forChild(),
    BsDropdownModule.forRoot(),
    CartProductStateModule.forChild(),
    AuthenticationStateModule.forChild(),
    TabsModule.forRoot(),
    ProductStateModule.forChild(),
    CategoryStateModule.forChild(),
    ChildCategoryStateModule.forChild(),
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
     /* Routing */
    RouterModule,
    HttpClientModule,
    NgxPermissionsModule.forRoot(),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'vn-VN'},
    ClientGuard
],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router) {
  }
}
