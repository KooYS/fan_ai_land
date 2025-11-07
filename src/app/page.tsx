import { redirect } from 'next/navigation';
import { defaultLocale } from '@/i18n/config';

export default function RootPage() {
  // 기본 언어(ko)로 리다이렉트
  redirect(`/${defaultLocale}`);
}
