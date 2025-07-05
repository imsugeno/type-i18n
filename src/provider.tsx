import React, { createContext, useState, useCallback, useMemo } from 'react';
import { I18nConfig, I18nContext, TranslationObject } from './types';
import { createTranslationFunction } from './core';

export function createI18nContext<T extends TranslationObject>() {
  return createContext<I18nContext<T> | null>(null);
}

export function createI18nProvider<T extends TranslationObject>(
  config: I18nConfig<T>
) {
  const I18nContext = createI18nContext<T>();

  const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [locale, setLocaleState] = useState(config.defaultLocale);

    const setLocale = useCallback((newLocale: string) => {
      if (config.translations[newLocale]) {
        setLocaleState(newLocale);
      } else {
        console.warn(`Locale "${newLocale}" not found in translations`);
      }
    }, []);

    const currentTranslations = useMemo(() => {
      return config.translations[locale] || config.translations[config.fallbackLocale || config.defaultLocale];
    }, [locale]);

    const t = useMemo(() => {
      return createTranslationFunction(currentTranslations);
    }, [currentTranslations]);

    const value: I18nContext<T> = {
      locale,
      setLocale,
      t,
      translations: currentTranslations,
    };

    return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
  };

  return { I18nProvider, I18nContext };
}