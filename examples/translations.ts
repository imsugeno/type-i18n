export const enTranslations = {
  common: {
    welcome: 'Welcome',
    goodbye: 'Goodbye',
    loading: 'Loading...',
    error: 'An error occurred',
  },
  user: {
    profile: {
      name: 'Name',
      email: 'Email',
      age: 'Age',
    },
    greeting: 'Hello, {{name}}!',
    status: {
      online: 'Online',
      offline: 'Offline',
      away: 'Away',
    },
  },
  product: {
    title: 'Product',
    price: 'Price: ${{amount}}',
    quantity: 'Quantity: {{count}}',
    addToCart: 'Add to Cart',
    outOfStock: 'Out of Stock',
  },
  messages: {
    success: {
      saved: 'Successfully saved!',
      deleted: 'Successfully deleted!',
      updated: 'Successfully updated!',
    },
    error: {
      notFound: 'Not found',
      unauthorized: 'Unauthorized',
      serverError: 'Server error',
    },
  },
} as const;

export const jaTranslations = {
  common: {
    welcome: 'ようこそ',
    goodbye: 'さようなら',
    loading: '読み込み中...',
    error: 'エラーが発生しました',
  },
  user: {
    profile: {
      name: '名前',
      email: 'メールアドレス',
      age: '年齢',
    },
    greeting: 'こんにちは、{{name}}さん！',
    status: {
      online: 'オンライン',
      offline: 'オフライン',
      away: '離席中',
    },
  },
  product: {
    title: '商品',
    price: '価格: ¥{{amount}}',
    quantity: '数量: {{count}}',
    addToCart: 'カートに追加',
    outOfStock: '在庫切れ',
  },
  messages: {
    success: {
      saved: '保存しました！',
      deleted: '削除しました！',
      updated: '更新しました！',
    },
    error: {
      notFound: '見つかりません',
      unauthorized: '権限がありません',
      serverError: 'サーバーエラー',
    },
  },
} as const;

export type Translations = typeof enTranslations;