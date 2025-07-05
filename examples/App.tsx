import React from 'react';
import { createI18n } from '../src';
import { enTranslations, jaTranslations, Translations } from './translations';

const { I18nProvider, useTranslation, useLocale, Trans } = createI18n<Translations>({
  defaultLocale: 'en',
  translations: {
    en: enTranslations,
    ja: jaTranslations,
  },
  fallbackLocale: 'en',
});

function LanguageSelector() {
  const [locale, setLocale] = useLocale();

  return (
    <select value={locale} onChange={(e) => setLocale(e.target.value)}>
      <option value="en">English</option>
      <option value="ja">日本語</option>
    </select>
  );
}

function UserGreeting({ name }: { name: string }) {
  const t = useTranslation();

  return (
    <div>
      <h2>{t('user.greeting', { name })}</h2>
      <p>{t('user.profile.name')}: {name}</p>
      <p>{t('user.status.online')}</p>
    </div>
  );
}

function ProductCard({ price, quantity }: { price: number; quantity: number }) {
  return (
    <div className="product-card">
      <h3><Trans i18nKey="product.title" /></h3>
      <p><Trans i18nKey="product.price" params={{ amount: price }} /></p>
      <p><Trans i18nKey="product.quantity" params={{ count: quantity }} /></p>
      <button>
        <Trans i18nKey="product.addToCart" />
      </button>
    </div>
  );
}

function MessageExamples() {
  const t = useTranslation();

  return (
    <div>
      <h3>Messages</h3>
      <p className="success">{t('messages.success.saved')}</p>
      <p className="error">{t('messages.error.notFound')}</p>
    </div>
  );
}

function App() {
  const t = useTranslation();

  return (
    <div className="app">
      <header>
        <h1>{t('common.welcome')}</h1>
        <LanguageSelector />
      </header>
      
      <main>
        <UserGreeting name="Alice" />
        <ProductCard price={29.99} quantity={5} />
        <MessageExamples />
      </main>

      <footer>
        <p>{t('common.goodbye')}</p>
      </footer>
    </div>
  );
}

export default function ExampleApp() {
  return (
    <I18nProvider>
      <App />
    </I18nProvider>
  );
}