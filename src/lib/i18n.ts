// 지원 언어 정의
export const supportedLanguages = ['ko', 'en', 'ja', 'zh'] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

// 기본 언어
export const defaultLanguage: SupportedLanguage = 'ko';

// 언어별 표시 이름
export const languageNames: Record<SupportedLanguage, string> = {
  ko: '한국어',
  en: 'English',
  ja: '日本語',
  zh: '中文',
};

// 언어 코드를 쿠키에 저장하고 조회하는 함수
export function getStoredLanguage(): SupportedLanguage | null {
  if (typeof window === 'undefined') return null;

  const stored = localStorage.getItem('language');
  if (stored && supportedLanguages.includes(stored as SupportedLanguage)) {
    return stored as SupportedLanguage;
  }
  return null;
}

export function setStoredLanguage(lang: SupportedLanguage) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('language', lang);
  }
}

// 브라우저 언어에서 지원되는 언어 찾기
export function getPreferredLanguage(): SupportedLanguage {
  if (typeof window === 'undefined') return defaultLanguage;

  const stored = getStoredLanguage();
  if (stored) return stored;

  const browserLang = navigator.language.split('-')[0];
  if (supportedLanguages.includes(browserLang as SupportedLanguage)) {
    return browserLang as SupportedLanguage;
  }

  return defaultLanguage;
}
