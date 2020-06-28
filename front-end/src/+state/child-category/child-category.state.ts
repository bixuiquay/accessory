import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { ApiUrlToken, HttpService, environment, throwIfAlreadyLoaded } from 'src/core/src';
import { ChildCategoryFacade } from './child-category.facade';
import { ChildCategoryQuery } from './child-category.query';
import { ChildCategoryService } from './child-category.service';
import { ChildCategoryStore } from './child-category.store';

@NgModule()
export class ChildCategoryStateModule {
  static forChild(): ModuleWithProviders {
    return {
      ngModule: ChildCategoryStateModule,
      providers: [
        {
          provide: ApiUrlToken,
          useValue: environment.api.urls.accessoryUrl,
        },
        HttpService,
        ChildCategoryFacade,
        ChildCategoryQuery,
        ChildCategoryService,
        ChildCategoryStore
      ]
    };
  }

  constructor(
    @Optional()
    @SkipSelf()
    parentModule: ChildCategoryStateModule,
  ) {
    throwIfAlreadyLoaded(parentModule, 'ChildCategoryStateModule');
  }
}
