import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { ApiUrlToken, HttpService, environment, throwIfAlreadyLoaded } from 'src/core/src';
import { ProductFacade } from './product.facade';
import { ProductQuery } from './product.query';
import { ProductService } from './product.service';
import { ProductStore } from './product.store';
@NgModule()
export class ProductStateModule {
  static forChild(): ModuleWithProviders {
    return {
      ngModule: ProductStateModule,
      providers: [
        {
          provide: ApiUrlToken,
          useValue: environment.api.urls.accessoryUrl,
        },
        HttpService,
        ProductFacade,
        ProductQuery,
        ProductService,
        ProductStore
      ]
    };
  }

  constructor(
    @Optional()
    @SkipSelf()
    parentModule: ProductStateModule,
  ) {
    throwIfAlreadyLoaded(parentModule, 'ProductStateModule');
  }

}


