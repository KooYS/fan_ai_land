'use client';

import { useTranslations } from 'next-intl';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import TrendIndicator, { TrendType } from './trend-indicator';

export interface TrendingCreator {
  id: string;
  username: string;
  avatar: string;
  followers: number;
  trend: TrendType;
  percentage: number;
  isFollowing?: boolean;
}

interface TrendingCreatorsProps {
  creators?: TrendingCreator[];
  onCreatorClick?: (username: string) => void;
  onFollowClick?: (creatorId: string) => void;
}

const DEFAULT_TRENDING_CREATORS: TrendingCreator[] = [
  {
    id: '1',
    username: 'kpop_fan_01',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=kpop_fan_01',
    followers: 15420,
    trend: 'up',
    percentage: 18,
    isFollowing: false,
  },
  {
    id: '2',
    username: 'idol_photographer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=idol_photographer',
    followers: 12890,
    trend: 'up',
    percentage: 11,
    isFollowing: false,
  },
  {
    id: '3',
    username: 'fan_artist_99',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=fan_artist_99',
    followers: 9540,
    trend: 'stable',
    percentage: 0,
    isFollowing: false,
  },
  {
    id: '4',
    username: 'kpop_news_hub',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=kpop_news_hub',
    followers: 8320,
    trend: 'down',
    percentage: 3,
    isFollowing: true,
  },
  {
    id: '5',
    username: 'music_lover_kr',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=music_lover_kr',
    followers: 7100,
    trend: 'up',
    percentage: 22,
    isFollowing: false,
  },
];

const TrendingCreators = ({
  creators = DEFAULT_TRENDING_CREATORS,
  onCreatorClick,
  onFollowClick,
}: TrendingCreatorsProps) => {
  const t = useTranslations('pages.feed.trending');

  return (
    <div className="space-y-2">
      {creators.map((creator, index) => (
        <div
          key={creator.id}
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
        >
          <span className="text-xs font-medium text-muted-foreground w-6">
            #{index + 1}
          </span>

          <Button
            variant="ghost"
            className="flex-1 justify-start gap-3 h-auto p-0 hover:bg-transparent"
            onClick={() => onCreatorClick?.(creator.username)}
          >
            <Avatar className="w-8 h-8 flex-shrink-0">
              <AvatarImage src={creator.avatar} alt={creator.username} />
              <AvatarFallback>
                {creator.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 text-left min-w-0">
              <p className="font-medium text-sm truncate">@{creator.username}</p>
              <p className="text-xs text-muted-foreground">
                {t('follow')} {creator.followers.toLocaleString()}명
              </p>
            </div>
          </Button>

          <div className="flex items-center gap-2 flex-shrink-0">
            <TrendIndicator
              type={creator.trend}
              percentage={creator.percentage}
            />

            <Button
              size="sm"
              variant={creator.isFollowing ? 'outline' : 'default'}
              className="text-xs h-7 px-2.5"
              onClick={() => onFollowClick?.(creator.id)}
            >
              {creator.isFollowing ? t('following') : t('follow')}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrendingCreators;
