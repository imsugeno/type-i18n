export * from './types';
export * from './core';
export * from './provider';
export * from './hooks';
export * from './components';

import { TranslationObject, I18nConfig } from './types';
import { createI18nProvider } from './provider';
import { createUseI18n, createUseTranslation, createUseLocale } from './hooks';
import { createTransComponent } from './components';

export function createI18n<T extends TranslationObject>(config: I18nConfig<T>) {
  const { I18nProvider, I18nContext } = createI18nProvider(config);
  const useI18n = createUseI18n(I18nContext);
  const useTranslation = createUseTranslation(I18nContext);
  const useLocale = createUseLocale(I18nContext);
  const Trans = createTransComponent<T>(I18nContext);

  return {
    I18nProvider,
    useI18n,
    useTranslation,
    useLocale,
    Trans,
  };
}