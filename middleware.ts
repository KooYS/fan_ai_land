import createMiddleware from 'next-intl/middleware';
import { defaultLocale, locales } from './src/i18n';

/**
 * next-intl 미들웨어
 * context7 표준: 명시적인 locale 라우팅 설정
 * - localePrefix: 'as-needed' - 기본 언어(ko)는 URL 프리픽스 생략
 * - 다른 언어는 /en, /ja, /zh 형식으로 접근 가능
 */
export default createMiddleware({
  locales: locales as unknown as string[],
  defaultLocale,
  localePrefix: 'as-needed',
});

/**
 * 미들웨어 매칭 설정
 * - / : 루트 경로 (기본 locale으로 리다이렉트)
 * - /(ko|en|ja|zh)/:path* : 명시적 locale 경로
 */
export const config = {
  matcher: ['/', '/(ko|en|ja|zh)/:path*'],
};
