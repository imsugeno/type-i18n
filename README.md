# type-i18n

Type-safe internationalization library for React with full TypeScript support

## Features

- **TypeScript-first**: Define translations in TypeScript, not JSON
- **Complete type safety**: Full type inference for translation keys and parameters
- **Code completion**: IDE autocomplete and refactoring support
- **LLM-friendly**: Code-based dictionary definitions work seamlessly with AI tools
- **Lightweight**: Simple API with minimal dependencies

## Installation

```bash
npm install @imsugeno/type-i18n
# or
yarn add @imsugeno/type-i18n
# or
pnpm add @imsugeno/type-i18n
```

## Usage

### 1. Define translations in TypeScript

```typescript
// translations.ts
export const enTranslations = {
  common: {
    welcome: 'Welcome',
    goodbye: 'Goodbye',
  },
  user: {
    greeting: 'Hello, {{name}}!',
    profile: {
      name: 'Name',
      email: 'Email',
    },
  },
} as const;

export const jaTranslations = {
  common: {
    welcome: 'ようこそ',
    goodbye: 'さようなら',
  },
  user: {
    greeting: 'こんにちは、{{name}}さん！',
    profile: {
      name: '名前',
      email: 'メールアドレス',
    },
  },
} as const;

export type Translations = typeof enTranslations;
```

### 2. Create i18n instance

```typescript
// i18n.ts
import { createI18n } from '@imsugeno/type-i18n';
import { enTranslations, jaTranslations, Translations } from './translations';

export const { I18nProvider, useTranslation, useLocale, Trans } = createI18n<Translations>({
  defaultLocale: 'en',
  translations: {
    en: enTranslations,
    ja: jaTranslations,
  },
  fallbackLocale: 'en',
});
```

### 3. Wrap your app with the provider

```tsx
// App.tsx
import { I18nProvider } from './i18n';
import { MyComponent } from './MyComponent';

function App() {
  return (
    <I18nProvider>
      <MyComponent />
    </I18nProvider>
  );
}
```

### 4. Use translations in components

```tsx
// MyComponent.tsx
import { useTranslation, Trans } from './i18n';

function MyComponent() {
  const t = useTranslation();
  
  return (
    <div>
      {/* Using hook */}
      <h1>{t('common.welcome')}</h1>
      
      {/* With parameters */}
      <p>{t('user.greeting', { name: 'Alice' })}</p>
      
      {/* Using component */}
      <Trans i18nKey="user.profile.name" />
    </div>
  );
}
```

### 5. Switch languages

```tsx
import { useLocale } from './i18n';

function LanguageSelector() {
  const [locale, setLocale] = useLocale();
  
  return (
    <select value={locale} onChange={(e) => setLocale(e.target.value)}>
      <option value="en">English</option>
      <option value="ja">日本語</option>
    </select>
  );
}
```

## Key Features

### Type-safe translation keys

Translation keys are automatically inferred with full autocomplete:

```typescript
t('common.welcome');        // ✅ OK
t('common.welcom');         // ❌ TypeScript error
t('user.profile.name');     // ✅ Nested keys supported
```

### Type-safe parameters

Parameters are also type-checked:

```typescript
t('user.greeting', { name: 'Alice' });  // ✅ OK
t('user.greeting');                     // ❌ Missing params
t('user.greeting', { nam: 'Alice' });   // ❌ Typo
```

### Nested object support

Translations can be nested to any depth:

```typescript
const translations = {
  pages: {
    home: {
      title: 'Home',
      sections: {
        hero: {
          heading: 'Welcome to our site',
          subtitle: 'Glad to have you here',
        },
      },
    },
  },
};

// Usage: t('pages.home.sections.hero.heading')
```

## API Reference

### `createI18n<T>(config)`

Creates an i18n instance.

- `config.defaultLocale`: Default locale
- `config.translations`: Translations for each locale
- `config.fallbackLocale`: Fallback locale (optional)

### `useTranslation()`

Returns the translation function `t`.

### `useLocale()`

Returns current locale and locale setter.

### `useI18n()`

Returns the complete i18n context.

### `<Trans i18nKey="..." params={...} />`

Component for rendering translations.

## Comparison with react-i18next

| Feature | type-i18n | react-i18next |
|---------|-----------|---------------|
| Type safety | ✅ Full inference | ⚠️ Partial |
| Autocomplete | ✅ Works everywhere | ❌ Not in JSON |
| Dictionary format | TypeScript | JSON |
| LLM integration | ✅ Code-based | ❌ JSON is difficult |
| Bundle size | Small | Medium |
| Plugins | ❌ None | ✅ Many |
| Learning curve | Low | Medium |

## License

MIT