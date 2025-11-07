/**
 * i18n 설정 및 타입 정의
 * context7 기반 표준화된 i18n 구조
 */

import type ko from '../messages/ko.json';

export const defaultLocale = 'ko' as const;
export const locales = ['ko', 'en', 'ja', 'zh'] as const;
export type Locale = (typeof locales)[number];

/**
 * 메시지 타입 (next-intl 타입 안정성)
 */
export type IntlMessages = typeof ko;

/**
 * Locale 유효성 검사
 */
export function isValidLocale(locale: unknown): locale is Locale {
  return typeof locale === 'string' && locales.includes(locale as Locale);
}

/**
 * Locale 정규화 (유효하지 않으면 기본 locale 반환)
 */
export function normalizeLocale(locale: unknown): Locale {
  return isValidLocale(locale) ? locale : defaultLocale;
}

/**
 * Message path helper for request.ts
 * 이 함수는 request.ts에서만 사용됩니다.
 */
export function getMessageImportPath(locale: Locale): string {
  return `../../messages/${locale}.json`;
}

/**
 * 언어별 메타데이터
 */
export const localeMetadata: Record<Locale, { name: string; dir: 'ltr' | 'rtl' }> = {
  ko: { name: '한국어', dir: 'ltr' },
  en: { name: 'English', dir: 'ltr' },
  ja: { name: '日本語', dir: 'ltr' },
  zh: { name: '中文', dir: 'ltr' },
};
