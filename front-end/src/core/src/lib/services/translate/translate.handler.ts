import { MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';

/**
 * Missing translation handler
 */
export class TranslationHandler implements MissingTranslationHandler {
  /**
   * Handle missing resource
   *
   * @param  {MissingTranslationHandlerParams} params   The params
   * @return {void}                                      The handled info
   */
  handle = (params: MissingTranslationHandlerParams): void => {
    console.error(`Cannot find "${params.key}" from resources`);
  }
}