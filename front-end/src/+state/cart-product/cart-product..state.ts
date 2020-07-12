import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { ApiUrlToken, HttpService, environment, throwIfAlreadyLoaded } from 'src/core/src';
import { CartProductQuery } from './cart-product..query';
import { CartProductService } from './cart-product..service';
import { CartProductStore } from './cart-product..store';
import { CartProductFacade } from './cart-product.facade';

@NgModule()
export class CartProductStateModule {
  static forChild(): ModuleWithProviders {
    return {
      ngModule: CartProductStateModule,
      providers: [
        {
          provide: ApiUrlToken,
          useValue: environment.api.urls.accessoryUrl,
        },
        HttpService,
        CartProductFacade,
        CartProductQuery,
        CartProductService,
        CartProductStore
      ]
    };
  }

  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CartProductStateModule,
  ) {
    throwIfAlreadyLoaded(parentModule, 'CartProductStateModule');
  }
}
