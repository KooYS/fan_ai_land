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
    <div className="container-wrapper">
      <div className="container flex flex-col py-6 gap-6">
        <RankingHeader />

        {/* Hero Section - Top 3 */}
        <RankingHero items={mockRankingItems} />

        {/* Charts Section */}
        <div className="rounded-lg border border-border bg-card p-6">
          <RankingCharts items={mockRankingItems} />
        </div>

        {/* Filters Section */}
        <RankingFilters onFilterChange={setFilters} />

        {/* Ranking List */}
        <RankingList items={filteredAndSortedItems} />
      </div>
    </div>
  );
}
