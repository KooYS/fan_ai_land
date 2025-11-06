'use client';

import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

export interface RankingFilters {
  artist: string | null;
  contentType: string | null;
  sortBy: 'aiScore' | 'likes' | 'views' | 'rankChange';
}

interface RankingFiltersProps {
  onFilterChange: (filters: RankingFilters) => void;
}

const ARTISTS = [
  'NewJeans',
  'IVE',
  'aespa',
  'BLACKPINK',
  'LE SSERAFIM',
  'TWICE',
  'STRAY KIDS',
  'SEVENTEEN',
];

const CONTENT_TYPES = [
  'Fancam',
  'Dance Practice',
  'Stage',
  'MV Behind',
  'Performance',
  'Interview',
];

const SORT_OPTIONS = [
  { value: 'aiScore', label: 'AI Score' },
  { value: 'likes', label: 'Most Liked' },
  { value: 'views', label: 'Most Viewed' },
  { value: 'rankChange', label: 'Trending' },
];

const RankingFilters = ({ onFilterChange }: RankingFiltersProps) => {
  const [filters, setFilters] = useState<RankingFilters>({
    artist: null,
    contentType: null,
    sortBy: 'aiScore',
  });

  const handleFilterChange = (newFilters: Partial<RankingFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters: RankingFilters = {
      artist: null,
      contentType: null,
      sortBy: 'aiScore',
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const activeFilterCount = [filters.artist, filters.contentType].filter(
    (f) => f !== null
  ).length;

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Filters</h3>
        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="gap-1 text-xs"
          >
            <X className="w-3 h-3" />
            Clear Filters
          </Button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Artist</label>
          <Select
            value={filters.artist || 'all'}
            onValueChange={(value) =>
              handleFilterChange({ artist: value === 'all' ? null : value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="All Artists" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Artists</SelectItem>
              {ARTISTS.map((artist) => (
                <SelectItem key={artist} value={artist}>
                  {artist}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Content Type</label>
          <Select
            value={filters.contentType || 'all'}
            onValueChange={(value) =>
              handleFilterChange({ contentType: value === 'all' ? null : value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {CONTENT_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Sort By</label>
          <Select
            value={filters.sortBy}
            onValueChange={(value) =>
              handleFilterChange({
                sortBy: value as RankingFilters['sortBy'],
              })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {activeFilterCount > 0 && (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Active Filters</label>
            <div className="flex flex-wrap gap-2">
              {filters.artist && (
                <Badge variant="secondary" className="gap-1">
                  {filters.artist}
                  <button
                    onClick={() => handleFilterChange({ artist: null })}
                    className="ml-1 hover:opacity-70"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {filters.contentType && (
                <Badge variant="secondary" className="gap-1">
                  {filters.contentType}
                  <button
                    onClick={() => handleFilterChange({ contentType: null })}
                    className="ml-1 hover:opacity-70"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RankingFilters;
