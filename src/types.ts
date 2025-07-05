export type TranslationValue = string | number | boolean;

export type TranslationObject = {
  [key: string]: TranslationValue | TranslationObject;
};

export type PathKeys<T> = T extends TranslationObject
  ? {
      [K in keyof T]: T[K] extends TranslationObject
        ? `${string & K}` | `${string & K}.${PathKeys<T[K]>}`
        : `${string & K}`;
    }[keyof T]
  : never;

export type PathValue<T, P extends string> = P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? T[K] extends TranslationObject
      ? PathValue<T[K], Rest>
      : never
    : never
  : P extends keyof T
  ? T[P]
  : never;

export type TranslationKeys<T extends TranslationObject> = PathKeys<T>;

export type InterpolationParams = Record<string, string | number>;

export type TranslationFunction<T extends TranslationObject> = {
  (key: TranslationKeys<T>, params?: InterpolationParams): string;
  (key: TranslationKeys<T>): string;
};

export interface I18nConfig<T extends TranslationObject> {
  defaultLocale: string;
  translations: Record<string, T>;
  fallbackLocale?: string;
}

export interface I18nContext<T extends TranslationObject> {
  locale: string;
  setLocale: (locale: string) => void;
  t: TranslationFunction<T>;
  translations: T;
}