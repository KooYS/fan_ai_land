'use client';

import MainBanner from './_components/main-banner';
import MainRanking from './_components/main-ranking';
import MainRecentFeeds from './_components/main-recent-feeds';
import MainStore from './_components/main-store';
import AIHommaSection from './_components/ai-homma-section';
import { mockMainRankingItems } from '@/data/mock-ranking';
import { useTranslation } from '@/hooks/useTranslation';

const bannerItems = [
  { src: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=4140&auto=format&fit=crop' },
  { src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=4140&auto=format&fit=crop' },
  { src: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=4140&auto=format&fit=crop' },
  { src: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=4140&auto=format&fit=crop' },
];

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="container-wrapper">
      <div>
        <MainBanner items={bannerItems} />
      </div>
      <div className="container flex flex-col justify-center py-6 gap-3">
        <div className="rounded-lg border border-black/20 border-dashed bg-white backdrop-blur-md p-6  w-full gap-2 flex flex-col">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold">{t('navigation.ranking')}</h1>
              <div className="flex items-center gap-2 text-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                <span className="text-muted-foreground text-xs">{t('pages.ranking.thisWeek')}</span>
              </div>
            </div>
          </div>
          <MainRanking items={mockMainRankingItems} />
        </div>
        <AIHommaSection />
        <div className="flex gap-3">
          <div className="rounded-lg border border-black/20 border-dashed bg-white backdrop-blur-md p-6  w-full gap-2 flex flex-col">
            <h1 className="text-xl font-bold">RECENT</h1>
            <MainRecentFeeds />
          </div>
          <div className="rounded-lg border border-black/20 border-dashed bg-white backdrop-blur-md p-6  w-full gap-2 flex flex-col">
            <h1 className="text-xl font-bold">POPULAR CREATORS</h1>
            <MainStore />
          </div>
        </div>
      </div>
    </div>
  );
}
