import { getRequestConfig } from 'next-intl/server';
import { normalizeLocale } from '../i18n';
import type { IntlMessages } from '@/i18n';

/**
 * next-intl 서버측 요청 설정
 * context7 표준: 유효성 검사 및 메시지 로딩 중앙화
 *
 * 메시지는 locale별로 정적 import로 로드됩니다.
 */
export default getRequestConfig(async ({ locale }) => {
  const validLocale = normalizeLocale(locale);

  // 각 locale별 메시지를 명시적으로 로드
  // 이렇게 하면 빌드 시 webpack이 정적으로 인식할 수 있습니다.
  let messages: IntlMessages;
  switch (validLocale) {
    case 'en':
      messages = (await import('../../messages/en.json')).default;
      break;
    case 'ja':
      messages = (await import('../../messages/ja.json')).default;
      break;
    case 'zh':
      messages = (await import('../../messages/zh.json')).default;
      break;
    case 'ko':
    default:
      messages = (await import('../../messages/ko.json')).default;
  }

  return {
    locale: validLocale,
    messages,
  };
});
