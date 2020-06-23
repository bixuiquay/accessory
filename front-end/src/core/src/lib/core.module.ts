import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Inject, NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// libs
import { MissingTranslationHandler, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';

// app
import { environment } from './environments/environment';
import { CORE_PROVIDERS, PlatformLanguageToken, WindowPlatformService } from './services';
import { LogService } from './services/log.service';
import { TranslateHttpLoader, TranslationHandler } from './services/translate';
import { throwIfAlreadyLoaded } from './utils';

/**
 * DEBUGGING
 */
LogService.DEBUG.LEVEL_4 = !environment.production;

// factories
export const winFactory = () => {
  return window;
}

export const platformLangFactory = () => {
  const browserLang = window.navigator.language || 'vi'; // fallback English

  // browser language has 2 codes, ex: 'en-US'
  return browserLang.split('-')[0];
}

export const createTranslateLoader = (http: HttpClient) => {
  return new TranslateHttpLoader(http, [
    { prefix: './assets/i18n/', suffix: '.json' },
  ]);
}

export const BASE_PROVIDERS: any[] = [
  ...CORE_PROVIDERS,
  {
    provide: APP_BASE_HREF,
    useValue: '/'
  },
  {
    provide: PlatformLanguageToken,
    useValue: 'vi'
    // Use below in case you want to read language from window
    // useFactory: platformLangFactory
  },
  {
    provide: WindowPlatformService,
    useFactory: winFactory
  }
];

@NgModule({
  imports: [
    CommonModule,
    //BrowserModule,
    //BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      },
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useClass: TranslationHandler
      }
    }),

    // Comment this due to we don't want to use Ngrx store
    // https://github.com/nrwl/nx/issues/575
    // NxModule.forRoot()
  ],
  providers: [...BASE_PROVIDERS],
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule,
    @Inject(PlatformLanguageToken) lang: string,
    translate: TranslateService
  ) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');

    // ensure default platform language is set
    translate.use(lang);
  }
}
