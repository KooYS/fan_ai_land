import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale } from './config';

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` is valid
  let validLocale: typeof locales[number] = defaultLocale;

  if (locales.includes(locale as typeof locales[number])) {
    validLocale = locale as typeof locales[number];
  }

  return {
    locale: validLocale,
    messages: (await import(`../../messages/${validLocale}.json`)).default,
  };
});
