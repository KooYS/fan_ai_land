'use client';

import { useState, useEffect } from 'react';
import { getPreferredLanguage, setStoredLanguage } from '@/lib/i18n';
import type { SupportedLanguage } from '@/lib/i18n';

// 번역 타입
type Messages = Record<string, unknown>;

// 모든 메시지 로드
const loadMessages = async (lang: SupportedLanguage): Promise<Messages> => {
  try {
    const messageModule = await import(`../../../messages/${lang}.json`);
    return messageModule.default as Messages;
  } catch (error) {
    console.error(`Failed to load messages for language: ${lang}`, error);
    return {};
  }
};

// 중첩된 객체에서 값 조회 (점 표기법 사용)
const getNestedValue = (obj: Messages, path: string): string | undefined => {
  const result = path.split('.').reduce((current: unknown, prop: string) => {
    if (typeof current === 'object' && current !== null) {
      return (current as Record<string, unknown>)[prop];
    }
    return undefined;
  }, obj);

  return typeof result === 'string' ? result : undefined;
};

export function useTranslation() {
  const [language, setLanguage] = useState<SupportedLanguage>('ko');
  const [messages, setMessages] = useState<Messages>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 클라이언트 측에서만 실행
    const preferred = getPreferredLanguage();
    setLanguage(preferred);

    // 메시지 로드
    loadMessages(preferred).then((msgs) => {
      setMessages(msgs);
      setLoading(false);
    });
  }, []);

  const t = (key: string, defaultValue?: string): string => {
    const value = getNestedValue(messages, key);
    return value || defaultValue || key;
  };

  const changeLanguage = async (newLang: SupportedLanguage) => {
    setLanguage(newLang);
    setStoredLanguage(newLang);

    const newMessages = await loadMessages(newLang);
    setMessages(newMessages);
  };

  return {
    t,
    language,
    changeLanguage,
    loading,
  };
}
