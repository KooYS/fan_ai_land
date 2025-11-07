'use client';

import { ReactNode } from 'react';
import { TranslationProvider } from '@/contexts/translation-context';

export function Providers({ children }: { children: ReactNode }) {
  return <TranslationProvider>{children}</TranslationProvider>;
}
