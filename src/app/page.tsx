import { redirect } from 'next/navigation';
import { defaultLocale } from '@/i18n';

/**
 * Root Page (/)
 * context7 표준: 기본 locale로 리다이렉트
 *
 * 동작:
 * - / → /ko (기본 언어 - 한국어)
 * - URL에서 locale 프리픽스 생략
 */
export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
