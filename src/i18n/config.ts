export const defaultLocale = 'ko' as const;
export const locales = ['ko', 'en', 'ja', 'zh'] as const;

export type Locale = (typeof locales)[number];
