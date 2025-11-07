'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Locale } from '@/i18n';

// 정적 메시지 임포트
import koMessages from '@/messages/ko.json';
import enMessages from '@/messages/en.json';
import jaMessages from '@/messages/ja.json';
import zhMessages from '@/messages/zh.json';

type Messages = Record<string, unknown>;

const messagesMap: Record<Locale, Messages> = {
  ko: koMessages,
  en: enMessages,
  ja: jaMessages,
  zh: zhMessages,
};

interface TranslationContextType {
  language: Locale;
  messages: Messages;
  changeLanguage: (lang: Locale) => void;
  t: (key: string, defaultValue?: string) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

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

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Locale>('ko');
  const [messages, setMessages] = useState<Messages>(koMessages);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 클라이언트에서만 실행
    setMounted(true);
    const preferred = (localStorage.getItem('language') as Locale) || 'ko';
    setLanguage(preferred);
    setMessages(messagesMap[preferred]);
  }, []);

  const t = (key: string, defaultValue?: string): string => {
    const value = getNestedValue(messages, key);
    return value || defaultValue || key;
  };

  const changeLanguage = (newLang: Locale) => {
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
    setMessages(messagesMap[newLang]);
  };

  // SSR 시 기본값 반환 (mounted 전까지)
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <TranslationContext.Provider value={{ language, messages, changeLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);

  // 마운트되지 않은 SSR 단계에서는 기본값 반환
  if (!context) {
    return {
      language: 'ko' as Locale,
      messages: koMessages,
      changeLanguage: () => {},
      t: (key: string, defaultValue?: string): string => defaultValue || key,
    };
  }

  return context;
}
