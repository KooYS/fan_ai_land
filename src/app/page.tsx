import { routing } from '@/i18n/routing';
import { redirect } from 'next/navigation';

/**
 * Root Page (/)
 * context7 표준: 기본 locale로 리다이렉트
 *
 * 동작:
 * - / → /ko (기본 언어 - 한국어)
 * - URL에서 locale 프리픽스 생략
 */
export default function RootPage() {
  redirect(`/${routing.defaultLocale}`);
}
