'use client';

import { useState } from 'react';
import RankingHeader from './_components/ranking-header';
import RankingList from './_components/ranking-list';
import RankingHero from './_components/ranking-hero';
import RankingFilters from './_components/ranking-filters';
import RankingCharts from './_components/ranking-charts';
import { mockRankingItems } from '@/data/mock-ranking';
import { RankingItem } from '@/types';
import type { RankingFilters as RankingFiltersType } from './_components/ranking-filters';
import { PageTransition } from '@/components/animations/page-transition';
import { StaggerList, StaggerItem } from '@/components/animations/stagger-list';

export default function RankingPage() {
  const [filters, setFilters] = useState<RankingFiltersType>({
    artist: null,
    contentType: null,
    sortBy: 'aiScore',
  });

  const filteredAndSortedItems = mockRankingItems.filter((item) => {
    if (filters.artist && item.artistName !== filters.artist) {
      return false;
    }
    if (
      filters.contentType &&
      !item.contentTitle.includes(filters.contentType)
    ) {
      return false;
    }
    return true;
  }).sort((a, b) => {
    switch (filters.sortBy) {
      case 'likes':
        return b.likes - a.likes;
      case 'views':
        return b.views - a.views;
      case 'rankChange':
        return b.rankChange - a.rankChange;
      case 'aiScore':
      default:
        return b.aiScore - a.aiScore;
    }
  }) as RankingItem[];

  return (
    <PageTransition>
      <div className="container-wrapper">
        <div className="container flex flex-col py-6 gap-6">
          <StaggerList staggerDelay={0.1} delayChildren={0.15}>
            <div className="space-y-6">
              <StaggerItem>
                <RankingHeader />
              </StaggerItem>

              <StaggerItem>
                <RankingHero items={mockRankingItems} />
              </StaggerItem>

              {/* Charts Section */}
              <StaggerItem>
                <div className="rounded-lg border border-border bg-card p-6">
                  <RankingCharts items={mockRankingItems} />
                </div>
              </StaggerItem>

              {/* Filters Section */}
              <StaggerItem>
                <RankingFilters onFilterChange={setFilters} />
              </StaggerItem>

              {/* Ranking List */}
              <StaggerItem>
                <RankingList items={filteredAndSortedItems} />
              </StaggerItem>
            </div>
          </StaggerList>
        </div>
      </div>
    </PageTransition>
  );
}
