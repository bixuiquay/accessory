import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { ApiUrlToken, HttpService, environment, throwIfAlreadyLoaded } from 'src/core/src';
import { InvoiceFacade } from './invoice.facade';
import { InvoiceQuery } from './invoice.query';
import { InvoiceService } from './invoice.service';
import { InvoiceStore } from './invoice.store';

@NgModule()
export class InvoiceStateModule {
  static forChild(): ModuleWithProviders {
    return {
      ngModule: InvoiceStateModule,
      providers: [
        {
          provide: ApiUrlToken,
          useValue: environment.api.urls.accessoryUrl,
        },
        HttpService,
        InvoiceFacade,
        InvoiceQuery,
        InvoiceService,
        InvoiceStore
      ]
    };
  }

  constructor(
    @Optional()
    @SkipSelf()
    parentModule: InvoiceStateModule,
  ) {
    throwIfAlreadyLoaded(parentModule, 'InvoiceStateModule');
  }
}
