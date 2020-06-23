import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ProductStateModule } from 'src/+state/product/product.state';
import { CoreModule } from 'src/core/src/lib/core.module';
import { AppComponent } from './app.component';
import { AppNavComponent } from './app-nav/app-nav.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { CategoryStateModule } from 'src/+state/category/category.state';

@NgModule({
  declarations: [
    AppComponent,
    AppNavComponent,
    AppHeaderComponent,
    AppFooterComponent
  ],
  imports: [
    ProductStateModule.forChild(),
    CategoryStateModule.forChild(),
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
     /* Routing */
    RouterModule,
    HttpClientModule,
    NgxPermissionsModule.forRoot(),
  ],
  providers: [ProductStateModule, ProductStateModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
