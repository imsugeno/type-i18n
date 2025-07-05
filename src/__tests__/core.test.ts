import { flattenObject, interpolate, getTranslation } from '../core';

describe('flattenObject', () => {
  it('should flatten nested objects', () => {
    const input = {
      a: {
        b: {
          c: 'value',
        },
        d: 'another',
      },
      e: 'top',
    };

    const result = flattenObject(input);

    expect(result).toEqual({
      'a.b.c': 'value',
      'a.d': 'another',
      'e': 'top',
    });
  });

  it('should handle mixed value types', () => {
    const input = {
      string: 'text',
      number: 42,
      boolean: true,
      nested: {
        value: 'nested value',
      },
    };

    const result = flattenObject(input);

    expect(result).toEqual({
      'string': 'text',
      'number': 42,
      'boolean': true,
      'nested.value': 'nested value',
    });
  });
});

describe('interpolate', () => {
  it('should replace parameters in template', () => {
    expect(interpolate('Hello {{name}}!', { name: 'World' })).toBe('Hello World!');
    expect(interpolate('{{count}} items', { count: 5 })).toBe('5 items');
  });

  it('should handle multiple parameters', () => {
    const template = '{{user}} sent {{count}} messages to {{recipient}}';
    const params = { user: 'Alice', count: 3, recipient: 'Bob' };
    
    expect(interpolate(template, params)).toBe('Alice sent 3 messages to Bob');
  });

  it('should leave unmatched parameters as is', () => {
    expect(interpolate('Hello {{name}}!', {})).toBe('Hello {{name}}!');
  });

  it('should handle spaces in parameter names', () => {
    expect(interpolate('Hello {{ name }}!', { name: 'World' })).toBe('Hello World!');
  });
});

describe('getTranslation', () => {
  const translations = {
    simple: 'Simple text',
    nested: {
      key: 'Nested value',
    },
    withParam: 'Hello {{name}}!',
  };

  it('should get simple translations', () => {
    expect(getTranslation(translations, 'simple' as any)).toBe('Simple text');
  });

  it('should get nested translations', () => {
    expect(getTranslation(translations, 'nested.key' as any)).toBe('Nested value');
  });

  it('should interpolate parameters', () => {
    expect(getTranslation(translations, 'withParam' as any, { name: 'World' })).toBe('Hello World!');
  });

  it('should return key if translation not found', () => {
    expect(getTranslation(translations, 'missing.key' as any)).toBe('missing.key');
  });
});