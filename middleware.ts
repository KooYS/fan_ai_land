import createMiddleware from 'next-intl/middleware';
import { defaultLocale, locales } from './src/i18n/config';

export default createMiddleware({
  locales: locales as unknown as string[],
  defaultLocale: defaultLocale,
  localePrefix: 'always',
});

export const config = {
  matcher: ['/', '/(ko|en|ja|zh)/:path*'],
};
