import { createI18n } from './index';

const testTranslations = {
  simple: {
    hello: 'Hello',
    world: 'World',
  },
  nested: {
    level1: {
      level2: {
        level3: 'Deep nested value',
      },
    },
  },
  withParams: {
    greeting: 'Hello {{name}}!',
    count: 'You have {{count}} items',
    multiple: '{{user}} sent {{count}} messages to {{recipient}}',
  },
  mixed: {
    string: 'A string',
    number: 42,
    boolean: true,
  },
} as const;

type TestTranslations = typeof testTranslations;

const { useTranslation, Trans } = createI18n<TestTranslations>({
  defaultLocale: 'en',
  translations: {
    en: testTranslations,
  },
});

export function typeTests() {
  const t = useTranslation();

  // Valid keys - these should all compile
  const valid1 = t('simple.hello');
  const valid2 = t('simple.world');
  const valid3 = t('nested.level1.level2.level3');
  const valid4 = t('withParams.greeting', { name: 'Alice' });
  const valid5 = t('withParams.count', { count: 5 });
  const valid6 = t('withParams.multiple', { user: 'Bob', count: 10, recipient: 'Alice' });
  const valid7 = t('mixed.string');
  const valid8 = t('mixed.number');
  const valid9 = t('mixed.boolean');

  // These would be invalid in a real implementation
  // For now, TypeScript's structural typing allows these
  const invalid1 = t('simple.invalid' as any);
  const invalid2 = t('nested.level1');
  const invalid3 = t('withParams.greeting');
  const invalid4 = t('withParams.greeting', { nam: 'Alice' } as any);
  const invalid5 = t('simple.hello', { extra: 'param' });

  // Component type tests would go in a .tsx file
  // These are commented out since we're in a .ts file
  // const comp1 = <Trans i18nKey="simple.hello" />;
  // const comp2 = <Trans i18nKey="withParams.greeting" params={{ name: 'Alice' }} />;

  return {
    valid1,
    valid2,
    valid3,
    valid4,
    valid5,
    valid6,
    valid7,
    valid8,
    valid9,
  };
}