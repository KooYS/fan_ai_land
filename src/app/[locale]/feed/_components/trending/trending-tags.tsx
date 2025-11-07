'use client';

import { Button } from '@/components/ui/button';
import TrendIndicator, { TrendType } from './trend-indicator';

export interface TrendingTag {
  id: string;
  tag: string;
  posts: number;
  trend: TrendType;
  percentage: number;
}

interface TrendingTagsProps {
  tags?: TrendingTag[];
  onTagClick?: (tag: string) => void;
}

const DEFAULT_TRENDING_TAGS: TrendingTag[] = [
  { id: '1', tag: 'NewJeans', posts: 2345, trend: 'up', percentage: 12 },
  { id: '2', tag: 'IVE', posts: 1890, trend: 'up', percentage: 8 },
  { id: '3', tag: 'aespa', posts: 1756, trend: 'stable', percentage: 0 },
  { id: '4', tag: 'BLACKPINK', posts: 1654, trend: 'down', percentage: 5 },
  { id: '5', tag: 'LE SSERAFIM', posts: 1432, trend: 'up', percentage: 15 },
];

const TrendingTags = ({
  tags = DEFAULT_TRENDING_TAGS,
  onTagClick,
}: TrendingTagsProps) => {
  return (
    <div className="space-y-2">
      {tags.map((tag, index) => (
        <Button
          key={tag.id}
          variant="ghost"
          className="w-full justify-between h-auto py-2 px-3 hover:bg-muted rounded-lg group"
          onClick={() => onTagClick?.(tag.tag)}
        >
          <div className="flex items-center gap-3 flex-1">
            <span className="text-xs font-medium text-muted-foreground w-6">
              #{index + 1}
            </span>
            <div className="flex-1 text-left min-w-0">
              <p className="font-medium text-sm break-words">#{tag.tag}</p>
              <p className="text-xs text-muted-foreground">
                {tag.posts.toLocaleString()}개 포스트
              </p>
            </div>
          </div>
          <TrendIndicator
            type={tag.trend}
            percentage={tag.percentage}
            className="flex-shrink-0"
          />
        </Button>
      ))}
    </div>
  );
};

export default TrendingTags;
