import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { ApiUrlToken, HttpService, environment, throwIfAlreadyLoaded } from 'src/core/src';
import { CategoryFacade } from './category.facade';
import { CategoryQuery } from './category.query';
import { CategoryService } from './category.service';
import { CategoryStore } from './category.store';

@NgModule()
export class CategoryStateModule {
  static forChild(): ModuleWithProviders {
    return {
      ngModule: CategoryStateModule,
      providers: [
        {
          provide: ApiUrlToken,
          useValue: environment.api.urls,
        },
        HttpService,
        CategoryFacade,
        CategoryQuery,
        CategoryService,
        CategoryStore
      ]
    };
  }

  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CategoryStateModule,
  ) {
    throwIfAlreadyLoaded(parentModule, 'CategoryStateModule');
  }
}
