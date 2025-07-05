import { TranslationObject, TranslationKeys, InterpolationParams } from './types';

export function flattenObject<T extends TranslationObject>(
  obj: T,
  prefix = ''
): Record<string, string | number | boolean> {
  const result: Record<string, string | number | boolean> = {};

  for (const key in obj) {
    const value = obj[key];
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      Object.assign(result, flattenObject(value as TranslationObject, newKey));
    } else {
      result[newKey] = value as string | number | boolean;
    }
  }

  return result;
}

export function interpolate(template: string, params: InterpolationParams): string {
  return template.replace(/{{\s*(\w+)\s*}}/g, (match, key) => {
    return params[key]?.toString() || match;
  });
}

export function getTranslation<T extends TranslationObject>(
  translations: T,
  key: TranslationKeys<T>,
  params?: InterpolationParams
): string {
  const flatTranslations = flattenObject(translations);
  const value = flatTranslations[key as string];

  if (value === undefined) {
    console.warn(`Translation key "${String(key)}" not found`);
    return String(key);
  }

  const stringValue = String(value);
  return params ? interpolate(stringValue, params) : stringValue;
}

export function createTranslationFunction<T extends TranslationObject>(
  translations: T
) {
  return function t(
    key: TranslationKeys<T>,
    params?: InterpolationParams
  ): string {
    return getTranslation(translations, key, params);
  };
}