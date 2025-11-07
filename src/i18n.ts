import type ko from '@/messages/ko.json';

/**
 * Supported locales in the application
 */
export const defaultLocale = 'ko' as const;
export const locales = ['ko', 'en', 'ja', 'zh'] as const;

/**
 * Locale type - represents all supported locales
 */
export type Locale = (typeof locales)[number];

/**
 * IntlMessages type - inferred from Korean message structure
 * Ensures type safety across all language files
 */
export type IntlMessages = typeof ko;

/**
 * Validates if a given value is a valid locale
 * @param locale - The value to validate
 * @returns True if locale is one of the supported locales
 */
export function isValidLocale(locale: unknown): locale is Locale {
  return typeof locale === 'string' && locales.includes(locale as Locale);
}

/**
 * Normalizes a locale value, returning a valid locale or the default
 * @param locale - The locale to normalize
 * @returns A valid locale from the supported list
 */
export function normalizeLocale(locale: unknown): Locale {
  return isValidLocale(locale) ? locale : defaultLocale;
}

/**
 * Metadata for each supported locale
 * Includes display name and text direction
 */
export const localeMetadata: Record<
  Locale,
  { name: string; nativeName: string; dir: 'ltr' | 'rtl' }
> = {
  ko: { name: 'Korean', nativeName: '한국어', dir: 'ltr' },
  en: { name: 'English', nativeName: 'English', dir: 'ltr' },
  ja: { name: 'Japanese', nativeName: '日本語', dir: 'ltr' },
  zh: { name: 'Chinese', nativeName: '中文', dir: 'ltr' },
};
