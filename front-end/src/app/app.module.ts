import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ProductStateModule } from 'src/+state/product/product.state';
import { CoreModule } from 'src/core/src/lib/core.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ProductStateModule.forChild(),
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
     /* Routing */
    RouterModule,
    HttpClientModule,
    NgxPermissionsModule.forRoot(),
  ],
  providers: [ProductStateModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
