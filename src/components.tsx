import React from 'react';
import { TranslationObject, TranslationKeys, InterpolationParams } from './types';
import { createUseTranslation } from './hooks';

export interface TransProps<T extends TranslationObject> {
  i18nKey: TranslationKeys<T>;
  params?: InterpolationParams;
  children?: never;
}

export function createTransComponent<T extends TranslationObject>(
  context: React.Context<any>
) {
  const useTranslation = createUseTranslation<T>(context);

  const Trans: React.FC<TransProps<T>> = ({ i18nKey, params }) => {
    const t = useTranslation();
    return <>{t(i18nKey, params)}</>;
  };

  return Trans;
}