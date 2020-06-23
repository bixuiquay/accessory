import { HttpClient } from "@angular/common/http";
import { TranslateLoader } from "@ngx-translate/core";
import { merge } from "lodash-es";
import { forkJoin } from "rxjs";
import { map } from "rxjs/operators";

export class TranslateHttpLoader implements TranslateLoader {
  constructor(
    private http: HttpClient,
    public resources: { prefix: string, suffix: string }[] = [{ prefix: '/assets/i18n/', suffix: '.json' }]
  ) { }
  /**
   * Get resources by lang
   *
   * @param  {string} lang    The language
   * @return {Observable}     The resources
   */
  getTranslation(lang: string): any {
    return forkJoin([
      // Core i18n
      import(`src/core/src/lib/assets/i18n/${lang}.json`),
      // Apps/External i18n
      ...this.resources.map(config => this.http.get(`${config.prefix}${lang}${config.suffix}`))
    ]).pipe(
      map(response => response.reduce((a, b) => merge({}, a, b)))
    );
  }
}