import { useContext } from 'react';
import { I18nContext, TranslationObject } from './types';

export function createUseI18n<T extends TranslationObject>(
  context: React.Context<I18nContext<T> | null>
) {
  return function useI18n() {
    const i18n = useContext(context);
    if (!i18n) {
      throw new Error('useI18n must be used within an I18nProvider');
    }
    return i18n;
  };
}

export function createUseTranslation<T extends TranslationObject>(
  context: React.Context<I18nContext<T> | null>
) {
  return function useTranslation() {
    const { t } = createUseI18n(context)();
    return t;
  };
}

export function createUseLocale<T extends TranslationObject>(
  context: React.Context<I18nContext<T> | null>
) {
  return function useLocale() {
    const { locale, setLocale } = createUseI18n(context)();
    return [locale, setLocale] as const;
  };
}